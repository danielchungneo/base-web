import { IComboBox } from "@/types/components/inputComponents";
import React, { forwardRef, Ref } from "react";
import BaseComboBox from "./BaseComboBox";
import FormComboBox from "./FormComboBox";

function ComboBox (props: IComboBox, ref: Ref<HTMLElement>) {
  const {
    //
    form = true,
  } = props;

  if (form) {
    return <FormComboBox {...props} />;
  }

  return <BaseComboBox {...props} ref={ref} />;
}

export default forwardRef(ComboBox);
