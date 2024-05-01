interface ChangeTextCompProps {
  id: string;
  onMouseEnter: (item: string) => void;
  onMouseEnterParam: string;
  onMouseLeave: () => void;
  children: React.ReactNode;
}

export default function ChangeTextComp({
  id,
  onMouseEnter,
  onMouseEnterParam,
  onMouseLeave,
  children,
}: ChangeTextCompProps) {
  return (
    <p
      id={id}
      onMouseEnter={() => onMouseEnter(onMouseEnterParam)}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </p>
  );
}
