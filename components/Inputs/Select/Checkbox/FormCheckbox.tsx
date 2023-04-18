import { ICheckbox } from "@/types/components/inputComponents";
import useFormInput from "@/utils/hooks/useFormInput";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import BaseCheckbox from "./BaseCheckbox";

function FormCheckbox (props: ICheckbox) {
  /**
   * DO RHF STUFF HERE:
   *
   * * register the input
   * * add custom onChange or parsers/formatters for incoming/outdoing data
   * * etc
   */

  const { disabled, ...other } = props;
  const { name } = props;
  const formContext = useFormContext();
  const { registration, error } = useFormInput(other);

  return (
    <Controller
      name={name}
      control={formContext.control}
      render={({ field }) => {
        return (
          <BaseCheckbox
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

export default FormCheckbox;
