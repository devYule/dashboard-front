interface ChangeInputCompProps {
  inputVal: string;
  className: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  style: React.CSSProperties;
  autoFocus: boolean;
  disabled?: boolean;
}

export default function ChangeInputComp({
  inputVal,
  className,
  onChange,
  placeHolder,
  onKeyUp,
  style,
  autoFocus,
  disabled,
}: ChangeInputCompProps) {
  return (
    <input
      value={inputVal}
      className={className}
      onChange={(e) => onChange(e)}
      // onBlur={onBlur}
      placeholder={placeHolder ? placeHolder : ""}
      onKeyUp={(e) => onKeyUp(e)}
      style={style}
      autoFocus={autoFocus}
      disabled={disabled ? disabled : false}
    />
  );
}
