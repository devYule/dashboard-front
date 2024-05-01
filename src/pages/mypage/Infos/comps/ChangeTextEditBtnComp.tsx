interface ChangeTextEditBtnCompProps {
  className: string;
  onClick: (param: string) => void;
  onClickParam: string;
}

export default function ChangeTextEditBtnComp({
  className,
  onClick,
  onClickParam,
}: ChangeTextEditBtnCompProps) {
  return (
    <button className={className} onClick={() => onClick(onClickParam)}>
      <p>edit</p>
    </button>
  );
}
