import { IAvatarPicker } from "@/types/components/inputComponents";
import useFormInput from "@/utils/hooks/useFormInput";
import React, { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import BaseAvatarPicker from "./BaseAvatarPicker";

function FormAvatarPicker (props: IAvatarPicker) {
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
          <BaseAvatarPicker
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

export default FormAvatarPicker;
