import { IForm } from "@/types/components/formComponents";
import clsx from "clsx";

function Form ({ children, className, ...formProps }: IForm) {
  return (
    <form className={clsx("w-full space-y-4", className)} {...formProps}>
      {/*  */}
      {children}
    </form>
  );
}

export default Form;
