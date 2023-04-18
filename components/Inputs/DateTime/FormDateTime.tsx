import { IDateTimePicker } from "@/types/components/inputComponents";
import useFormInput from "@/utils/hooks/useFormInput";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import BaseDateTime from "./BaseDateTime";

function FormDateTime (props: IDateTimePicker) {
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
          <BaseDateTime
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

export default FormDateTime;
