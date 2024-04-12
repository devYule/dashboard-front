import { InputLineProps } from "../../../interfaces/Interfaces";

export default function InputLine({ value, style: inputColorStyle, type: inputType, onChange: idOnChange, onKeyDown, autoFocus, placeholder, disabled = false }: InputLineProps) {
    return (
        autoFocus ?
            <input style={inputColorStyle} value={value} type={inputType} 
            onChange={idOnChange} onKeyDown={onKeyDown} 
            autoFocus placeholder={placeholder ?? ''} disabled={disabled} />
            :
            <input style={inputColorStyle} value={value} type={inputType} onChange={idOnChange} onKeyDown={onKeyDown} placeholder="" disabled={disabled} />
    );
}



