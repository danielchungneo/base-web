import { IPatternField } from "@/types/components/inputComponents";
import React, { forwardRef, Ref } from "react";
import { PatternFormat } from "react-number-format";
import BaseTextField from "../TextField/BaseTextField";

const BasePatternField = (props: IPatternField, ref: Ref<HTMLInputElement>) => {
  const {
    returnValue = "value",
    format,
    mask,
    onChange,
    onBlur,
    disabled,
    readOnly,
    loading,
    ...inputProps
  } = props;

  const isDisabled = readOnly || disabled || loading;

  const internalOnBlur = (evt: any) => {
    onBlur?.(evt);
  };

  const internalOnChange = evt => {
    /**
     * ignore onChange... the event we want is `onValueChange`
     */
  };

  const internalOnValueChange = (values, sourceInfo) => {
    let event = sourceInfo.event;

    if (event) {
      event.target.value = values[returnValue];
      onChange?.(event);
    }
  };

  return (
    <PatternFormat
      onBlur={internalOnBlur}
      onChange={internalOnChange}
      onValueChange={internalOnValueChange}
      //
      customInput={BaseTextField}
      getInputRef={ref}
      format={format}
      mask={mask}
      dsiabled={false}
      readOnly={isDisabled} // DO NOT USE `disabled` as RHF will remove the value
      {...inputProps}
    />
  );
};

export default forwardRef(BasePatternField);
