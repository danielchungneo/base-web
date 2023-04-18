import { INumberField } from "@/types/components/inputComponents";
import useFormInput from "@/utils/hooks/useFormInput";
import { Controller, useFormContext } from "react-hook-form";
import BaseNumberField from "./BaseNumberField";

function FormNumberField (props: INumberField) {
  /**
   * DO RHF STUFF HERE:
   *
   * * register the input
   * * add custom onChange or parsers/formatters for incoming/outdoing data
   * * etc
   */

  const { name, onChange, onBlur } = props;

  const formContext = useFormContext();
  const { registration, error } = useFormInput(props);

  return (
    <Controller
      name={name}
      control={formContext.control}
      render={({ field }) => {
        const internalOnBlur = (evt: any) => {
          registration.onBlur(evt);
          onBlur?.(evt);
        };

        const internalOnChange = event => {
          try {
            field.onChange(event);
            onChange?.(event);
            // !!sourceInfo.event && onChange?.(sourceInfo.event, true);
          } catch (error) {
            //
          }
        };

        // console.log("FormNumberField", );

        return (
          <BaseNumberField
            {...props}
            {...field}
            {...registration}
            error={error}
            onBlur={internalOnBlur}
            onChange={internalOnChange}
          />
        );
      }}
    />
  );
}

export default FormNumberField;
