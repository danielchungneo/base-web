import { ICheckbox } from "@/types/components/inputComponents";
import React, { forwardRef, Ref } from "react";
import BaseCheckbox from "./BaseCheckbox";
import FormCheckbox from "./FormCheckbox";

function Checkbox (props: ICheckbox, ref: Ref<HTMLInputElement>) {
  const {
    //
    form = true,
  } = props;

  if (form) {
    return <FormCheckbox {...props} />;
  }

  return <BaseCheckbox {...props} ref={ref} />;
}

export default forwardRef(Checkbox);
