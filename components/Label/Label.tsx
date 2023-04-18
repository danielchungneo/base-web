import { ILabel } from "@/types/components/displayComponents";
import clsx from "clsx";

const Label = ({ children, className = "", variant, ...props }: ILabel) => {
  if (!children) return null;

  const classes = clsx(variant, className);

  return (
    <label
      //
      className={clsx("label", classes)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
