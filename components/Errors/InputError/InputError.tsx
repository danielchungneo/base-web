import clsx from "clsx";

const InputError = ({ children, className }) => {
  if (!children) return null;

  return (
    <div className={clsx("text-center text-danger mt-1.5", className)}>
      {children}
    </div>
  );
};

export default InputError;
