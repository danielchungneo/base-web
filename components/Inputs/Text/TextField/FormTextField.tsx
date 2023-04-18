import { ITextField } from "@/types/components/inputComponents";
import useFormInput from "@/utils/hooks/useFormInput";
import BaseTextField from "./BaseTextField";

function FormTextField (props: ITextField) {
  /**
   * DO RHF STUFF HERE:
   *
   * * register the input
   * * add custom onChange or parsers/formatters for incoming/outdoing data
   * * etc
   */

  const { registration, error } = useFormInput(props);

  return (
    <BaseTextField
      //
      {...props}
      {...registration}
      error={error}
    />
  );
}

export default FormTextField;
