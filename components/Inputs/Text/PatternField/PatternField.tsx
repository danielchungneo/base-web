import React, { forwardRef, Ref } from "react";
import FormPatternField from "./FormPatternField";
import BasePatternField from "./BasePatternField";
import { IPatternField } from "@/types/components/inputComponents";

function PatternField (props: IPatternField, ref: Ref<HTMLInputElement>) {
  const {
    //
    form = true,
  } = props;

  if (form) {
    return <FormPatternField {...props} />;
  }

  return <BasePatternField {...props} ref={ref} />;
}

export default forwardRef(PatternField);
