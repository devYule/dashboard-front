interface ChangeInputContainerProps {
  children: React.ReactNode;
}

export default function ChangeInputContainer({
  children,
}: ChangeInputContainerProps) {
  return (
    <div className="changeContainer">
      {children}
    </div>
  );
}
