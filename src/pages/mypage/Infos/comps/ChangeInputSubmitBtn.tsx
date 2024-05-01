interface ChangeInputSubmitBtnProps {
  className: string;
  onClick: () => void;
}

export default function ChangeInputSubmitBtn({
  className,
  onClick,
}: ChangeInputSubmitBtnProps) {
  return (
    <button className={className} onClick={onClick}>
      <svg viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 18.3205L16 9.66025L1 1" stroke="black" />
      </svg>
    </button>
  );
}
