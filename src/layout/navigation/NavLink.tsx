import { ReactElement } from 'react';
import { Property } from 'csstype';
import { StyledNavLink } from '@/layout/navigation/styles/StyledNavLink';
import { Typography } from '@/ui/Typography/styles/Typography';

type NavLinkProps = {
    label?: string;
    prepend?: ReactElement;
    append?: ReactElement;
    isOpen?: boolean;
    isChecked?: boolean;
    border?: boolean;
    margin?: Property.Margin;
    gap?: Property.Gap;
    justifyContent?: Property.JustifyContent;
    isDisabled?: boolean;
    isVisible?: boolean;
    onClick?: () => void;
}
export const NavLink = (props: NavLinkProps) => {

    const {
        label,
        prepend,
        append,
        margin,
        border,
        isOpen,
        isChecked,
        justifyContent,
        isDisabled,
        onClick,
        gap = '15px',
    } = props;

    return (
        <StyledNavLink
            title={isDisabled ? 'Необходимо войти в аккаунт' : label}
            margin={margin}
            withBorder={border}
            gap={gap}
            isOpen={isOpen}
            isChecked={isChecked}
            isDisabled={isDisabled}
            justifyContent={justifyContent}
            onClick={isDisabled ? undefined : onClick}
        >
            {prepend}
            {isOpen && label && <Typography isEllipsis>{label}</Typography>}
            {append}
        </StyledNavLink>
    );
};