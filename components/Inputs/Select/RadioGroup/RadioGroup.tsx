import { IRadioGroup } from "@/types/components/inputComponents";
import React, { forwardRef, Ref } from "react";
import BaseRadioGroup from "./BaseRadioGroup";
import FormRadioGroup from "./FormRadioGroup";

function RadioGroup (props: IRadioGroup, ref: Ref<HTMLInputElement>) {
  const {
    //
    form = true,
  } = props;

  if (form) {
    return <FormRadioGroup {...props} />;
  }

  return <BaseRadioGroup {...props} ref={ref} />;
}

export default forwardRef(RadioGroup);
