import { forwardRef } from "react";
import { InputLineRegProps } from "../../../interfaces/Interfaces";

const InputLineReg = forwardRef<HTMLInputElement, InputLineRegProps>(({ value, className, style: inputColorStyle, type: inputType, onChange: idOnChange, onKeyDown, autoFocus, placeholder }: InputLineRegProps, ref) => {
    return (
        autoFocus ?
            <input className={className}
                style={inputColorStyle} type={inputType} value={value}
                onChange={idOnChange} onKeyDown={onKeyDown}
                autoFocus placeholder={placeholder ?? ''} ref={ref} />
            :
            <input className={className}
                style={inputColorStyle} type={inputType} value={value}
                onChange={idOnChange} onKeyDown={onKeyDown}
                placeholder={placeholder ?? ''} ref={ref} />
    )
});

export default InputLineReg;


// export default function InputLineReg({ className, style: inputColorStyle, type: inputType, onChange: idOnChange, onKeyDown, autoFocus, placeholder, ref }: InputLineRegProps) {
//     return (
//         autoFocus ?
//             <input className={className}
//                 style={inputColorStyle} type={inputType}
//                 onChange={idOnChange} onKeyDown={onKeyDown}
//                 autoFocus placeholder={placeholder ?? ''} ref={ref} />
//             :
//             <input className={className}
//                 style={inputColorStyle} type={inputType}
//                 onChange={idOnChange} onKeyDown={onKeyDown}
//                 placeholder={placeholder ?? ''} ref={ref} />
//     );
// }



