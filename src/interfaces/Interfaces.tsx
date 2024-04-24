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
    servKey: string;
}

export interface InputUserStatusProps {
    userIdStatus: { status: number | undefined, userId: string };
    setUserIdStatus: React.Dispatch<React.SetStateAction<{ status: number | undefined; userId: string; }>>;
    setServKey: React.Dispatch<React.SetStateAction<string>>;
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
    NONE = 'none',
    NEAR = 'near',
    HOVER = 'hover',
    CLICK = 'click',
    WIDGET = 'widget',
    BOOKMARK = 'bookmark',
}

export enum SidebarDirections {
    NONE = 'none',
    RIGHT = 'right',
    LEFT = 'left',
}

export enum SidebarSelectedItems {
    ADD_WIDGET, BOOKMARK, MYPAGE, LOGOUT
}

export enum SidebarHover {
    ON = 'on', OFF = 'off'
}

export enum LeftSidebarActions {
    NONE = 'none',
    NEAR = 'near',
    CLICK = 'click',
}

export interface WidgetInter {
    id: number;
    order: number;
    width: number;
    height: number;
    url: string;
    isShown: boolean;
}

export enum ModalType {
    NONE, CHANGE_PASSWORD, RESET_WIDGET, WITHDRAW
}