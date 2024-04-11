export default function MailValidBtn({ className, style, onClick, disabled, children }:
    { className: string, style: React.CSSProperties, onClick: () => void, disabled: boolean, children: React.ReactNode }
) {

    return (
        <button className={className} style={style} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}