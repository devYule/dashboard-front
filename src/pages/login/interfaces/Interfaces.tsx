import { CSSProperties } from "react";

export interface DirectionBtnProps {
    className: string;
    onClick: () => void;
    disabled: boolean;
    btnStyle: CSSProperties | undefined;
    btnDirection: string;
}

export interface InputProps {
    userId: string | null | undefined,
    setUserId: React.Dispatch<React.SetStateAction<string | null | undefined>>
}

export interface InputInputLineProps {
    style: React.CSSProperties;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    autoFocus: boolean;
}

