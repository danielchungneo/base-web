import { ITextField } from "@/types/components/inputComponents";
import React, { forwardRef, Ref } from "react";
import BaseTextField from "./BaseTextField";
import FormTextField from "./FormTextField";

function TextField (props: ITextField, ref: Ref<HTMLInputElement>) {
  const {
    //
    form = true,
  } = props;

  if (form) {
    return <FormTextField {...props} />;
  }

  return <BaseTextField {...props} ref={ref} />;
}

export default forwardRef(TextField);
