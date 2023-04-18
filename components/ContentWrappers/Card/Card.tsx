import clsx from "clsx";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "flex flex-col border bg-white p-6 rounded-lg w-full mx-auto lg:p-8 space-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
