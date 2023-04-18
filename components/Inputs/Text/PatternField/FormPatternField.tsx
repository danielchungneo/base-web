import { IPatternField } from "@/types/components/inputComponents";
import useFormInput from "@/utils/hooks/useFormInput";
import { Controller, useFormContext } from "react-hook-form";
import BasePatternField from "./BasePatternField";

function FormPatternField (props: IPatternField) {
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
            // console.log("FormPatternField", {
            //   event,
            //   value: event.target.value,
            // });

            // const updateValueToUse = values.floatValue;

            // registration.onChange(updateValueToUse);

            field.onChange(event);
            onChange?.(event);

            // !!sourceInfo.event && onChange?.(sourceInfo.event, true);
          } catch (error) {
            //
          }
        };

        // console.log("FormPatternField", {
        //   field,
        //   props,
        //   registration,
        //   error,
        // });

        return (
          <BasePatternField
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

export default FormPatternField;
