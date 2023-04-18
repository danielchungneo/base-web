import { ISelectBox } from "@/types/components/inputComponents";
import useFormInput from "@/utils/hooks/useFormInput";
import { Controller, useFormContext } from "react-hook-form";
import BaseSelectBox from "./BaseSelectBox";

function FormSelectBox (props: ISelectBox) {
  /**
   * DO RHF STUFF HERE:
   *
   * * register the input
   * * add custom onChange or parsers/formatters for incoming/outdoing data
   * * etc
   */

  const { name } = props;

  const formContext = useFormContext();
  const { registration, error } = useFormInput(props);

  return (
    <Controller
      name={name}
      control={formContext.control}
      render={({ field }) => {
        return (
          <BaseSelectBox
            //
            {...props}
            {...field}
            {...registration}
            error={error}
          />
        );
      }}
    />
  );
}

export default FormSelectBox;
