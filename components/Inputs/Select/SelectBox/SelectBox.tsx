import { ISelectBox } from "@/types/components/inputComponents";
import React, { forwardRef, Ref } from "react";
import BaseSelectBox from "./BaseSelectBox";
import FormSelectBox from "./FormSelectBox";

function SelectBox (props: ISelectBox, ref: Ref<HTMLElement>) {
  const {
    //
    form = true,
  } = props;

  if (form) {
    return <FormSelectBox {...props} />;
  }

  return <BaseSelectBox {...props} ref={ref} />;
}

export default forwardRef(SelectBox);
