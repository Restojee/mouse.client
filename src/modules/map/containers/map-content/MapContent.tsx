import React, { useCallback, useMemo } from 'react';
import { useMap } from '@/modules/map/common';
import { IS_TABLET } from '@/common/constants';
import { getMapImageLink } from '@/common/utils';
import { formatDateTime } from '@/common/utils/formatDateTime';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { ModalCloseIcon } from '@/ui/ModalCloseIcon/ModalCloseIcon';
import { SidebarIcons } from './containers/actions/SidebarIcons';
import { SidebarComments } from './containers/comments/SidebarComments';
import { MiniMapImages } from './containers/completed-images/MiniMapImages';
import { Header } from './containers/header/Header';
import { Preview } from './containers/image/Preview';
import { Note } from './containers/note/Note';
import { Tags } from './containers/tags/Tags';
import { SidebarProfile } from './components/sidebar-profile/SidebarProfile';
import { StyledMapContentMain, StyledMapContentSidebar } from '../../styles/styled';
import { Paper } from '@/ui/Paper';

// eslint-disable-next-line react/display-name
export const MapContent = React.memo(() => {
    const theme = useAppTheme();
    const { closeMap } = useMapView();
    const { map } = useMap();

    const fixEventPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }, []);

    const dateTime = useMemo(() => {
        if (map) {
            return formatDateTime(map?.createdUtcDate);
        }
        return '';
    }, [map]);

    const mapImageLink = useMemo(() => {
        return getMapImageLink(map?.image);
    }, [map?.image]);

    return (
        <Paper
            onClick={fixEventPropagation}
            align={'flex-start'}
            padding={0}
            bgColor={theme.colors.primary}
            direction={!IS_TABLET ? 'row' : 'column'}
            maxWidth={1200}
            overflow={'auto'}
        >
            <StyledMapContentMain>
                <Header
                    completeCount={1}
                    viewCount={2}
                    commentsCount={3}
                    title={map?.name}
                />
                <Preview image={mapImageLink}/>
                <MiniMapImages/>
                <Note/>
                <Tags tags={map?.tags}/>
            </StyledMapContentMain>
            <StyledMapContentSidebar>
                <ModalCloseIcon
                    color={theme.colors.textOnSecondary}
                    onClick={closeMap}
                />
                <SidebarProfile
                    user={map?.user}
                    date={dateTime}
                />
                <SidebarIcons mapId={map?.id}/>
                <SidebarComments mapId={map?.id}/>
            </StyledMapContentSidebar>
        </Paper>
    );
});

