import { InputLineMailProps } from "../../../interfaces/Interfaces";

export default function InputLineMail({ className, value, style: inputColorStyle, type: inputType, onChange: idOnChange, onKeyDown, autoFocus, placeholder, disabled = false }: InputLineMailProps) {
    return (
        autoFocus ?
            <input className={className}
            style={inputColorStyle} value={value} type={inputType} 
            onChange={idOnChange} onKeyDown={onKeyDown} 
            autoFocus placeholder={placeholder ?? ''} disabled={disabled} />
            :
            <input className={className}
            style={inputColorStyle} value={value} type={inputType} onChange={idOnChange} onKeyDown={onKeyDown} placeholder="" disabled={disabled} />
    );
}



