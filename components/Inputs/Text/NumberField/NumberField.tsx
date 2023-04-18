import React, { forwardRef, Ref } from "react";
import FormNumberField from "./FormNumberField";
import BaseNumberField from "./BaseNumberField";
import { INumberField } from "@/types/components/inputComponents";

function NumberField (props: INumberField, ref: Ref<HTMLInputElement>) {
  const {
    //
    form = true,
  } = props;

  if (form) {
    return <FormNumberField {...props} />;
  }

  return <BaseNumberField {...props} ref={ref} />;
}

export default forwardRef(NumberField);
