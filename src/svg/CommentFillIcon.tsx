import React, { FC } from 'react';
import { SvgIconPropsType } from "@/svg/types";

export const CommentFillIcon: FC<SvgIconPropsType> = (props) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                fill={props.color || 'white'}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 11C20 8.19108 20 6.78661 19.3259 5.77772C19.034 5.34096 18.659 4.96596 18.2223 4.67412C17.2134 4 15.8089 4 13 4H11C8.19108 4 6.78661 4 5.77772 4.67412C5.34096 4.96596 4.96596 5.34096 4.67412 5.77772C4 6.78661 4 8.19108 4 11C4 13.8089 4 15.2134 4.67412 16.2223C4.96596 16.659 5.34096 17.034 5.77772 17.3259C6.65907 17.9148 7.8423 17.9892 10 17.9986V18L11.1056 20.2111C11.4741 20.9482 12.5259 20.9482 12.8944 20.2111L14 18V17.9986C16.1577 17.9892 17.3409 17.9148 18.2223 17.3259C18.659 17.034 19.034 16.659 19.3259 16.2223C20 15.2134 20 13.8089 20 11ZM8 12C8.55228 12 9 11.5523 9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12ZM13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11ZM17 11C17 11.5523 16.5523 12 16 12C15.4477 12 15 11.5523 15 11C15 10.4477 15.4477 10 16 10C16.5523 10 17 10.4477 17 11Z"
            />
        </svg>
    );
}
