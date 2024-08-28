import { useUser } from "@/modules/user/hooks/useUser";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
import React, { useCallback, useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/modules/auth/slice";
import { Map } from "@/api/codegen/genMouseMapsApi";
import { useMapComments } from "./useMapComments";
import { StyledBox } from "@/ui/Box";
import { Display } from "@/ui/Display/Display";
import { Message } from "@/ui/Message";
import { MessageSendFormContainer } from "@/ui/Message/MessagesSendForm";

type MapContentSidebarCommentsPropsType = {
  levelId: Map["id"];
};
export const SidebarComments = ({ levelId }: MapContentSidebarCommentsPropsType) => {
  const {
    comments,
    commentText,
    onCommentAdd,
    onInputChange,
    onInputKeyUp,
    isCommentsInitialized,
    isCommentCreateFetching,
  } = useMapComments();

  const { onOpenUserModal } = useUser();

  const isAuth = useAppSelector(selectIsAuth);

  const scrollToBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottomHandler = (isNotSmooth?: boolean) => {
    const ref = scrollToBottomRef.current;
    const timeout = isNotSmooth ? 0 : 200;

    if (ref) {
      setTimeout(() => {
        ref.scrollTo({
          top: ref.scrollHeight,
          behavior: isNotSmooth ? undefined : "smooth",
        });
      }, timeout);
    }
  };

  const onFocusHandler = useCallback(async () => {
    scrollToBottomHandler();
  }, []);

  const onCommentAddHandler = useCallback(async () => {
    await onCommentAdd(levelId);
  }, [onCommentAdd, levelId]);

  const onInputKeyUpHandler = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      await onInputKeyUp(e, levelId);
    },
    [onInputKeyUp, levelId],
  );

  const onUsernameClickHandler = useCallback(
    (id: number) => {
      onOpenUserModal(id);
    },
    [onOpenUserModal],
  );

  useEffect(() => {
    scrollToBottomHandler(true);
  }, [comments?.length]);

  useEffect(() => {
    scrollToBottomHandler();
  }, []);

  return (
    <StyledBox
      width={"100%"}
      grow={1}
      direction={"column"}
      overflow={"hidden"}
      position={"relative"}
    >
      <Display condition={comments?.length}>
        <StyledBox
          ref={scrollToBottomRef}
          gap={10}
          direction={"column"}
          overflow={"auto"}
          padding={"20px 0 0"}
        >
          {comments?.map((mapComment) => (
            <Message
              key={mapComment.id}
              comment={mapComment}
              onUsernameClick={onUsernameClickHandler}
            />
          ))}
        </StyledBox>
      </Display>
      <BoxLoader isLoading={!isCommentsInitialized} />
      <Display condition={!comments?.length && isCommentsInitialized}>
        <StyledBox
          align={"center"}
          grow={1}
          margin={"auto"}
          textAlign={"center"}
          opacity={0.4}
        >
          Комментариев пока нет
        </StyledBox>
      </Display>
      <MessageSendFormContainer
        isFetching={isCommentCreateFetching}
        disabled={!isAuth}
        value={commentText}
        onFocus={onFocusHandler}
        onChange={onInputChange}
        onKeyUp={onInputKeyUpHandler}
        onSendClick={onCommentAddHandler}
      />
    </StyledBox>
  );
};
