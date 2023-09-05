interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Card = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={`p-2 rounded-lg border border-transparant-800 w-full min-w-[200px] h-[200px] min-h-[200px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
