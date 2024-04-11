import { InputInputLineProps } from "../interfaces/Interfaces";

export default function InputLine({ style: inputColorStyle, type: inputType, onChange: idOnChange, onKeyDown, autoFocus }: InputInputLineProps) {
    return (
        autoFocus ?
            <input style={inputColorStyle} type={inputType} onChange={idOnChange} onKeyDown={onKeyDown} autoFocus placeholder="" />
            :
            <input style={inputColorStyle} type={inputType} onChange={idOnChange} onKeyDown={onKeyDown} placeholder="" />
    );
}



