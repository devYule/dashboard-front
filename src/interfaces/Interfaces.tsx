import { CSSProperties } from "react";

export interface DirectionBtnProps {
    className: string;
    onClick: () => void;
    disabled: boolean;
    btnStyle: CSSProperties | undefined;
    btnDirection: string;
}

export interface InputIdProps {
    userId: string;
    setUserId: React.Dispatch<React.SetStateAction<string | undefined>>
}

export interface InputPasswordProps {
    userId: string;
    setUserIdStatus: React.Dispatch<React.SetStateAction<{ status: number | undefined; userId: string; }>>;
}

export interface InputUserStatusProps {
    userIdStatus: { status: number | undefined, userId: string };
    setUserIdStatus: React.Dispatch<React.SetStateAction<{ status: number | undefined; userId: string; }>>;
}

export interface InputLineProps {
    value: string;
    style: CSSProperties;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    autoFocus: boolean;
    placeholder: string;
    disabled: boolean;
}

export interface InputLineRegProps extends InputLineProps {
    className: string | undefined;
}

export interface InputLineMailProps extends InputLineProps {
    className: string;
}

export enum SidebarActions {
    NEAR = 'near',
    HOVER = 'hover',
    CLICK = 'click',
}

export enum SidebarDirections {
    NONE = 'none',
    RIGHT = 'right',
    LEFT = 'left',
}

export enum SidebarSelectedItems {
    ADD_WIDGET, BOOKMARK, MYPAGE, LOGOUT
}