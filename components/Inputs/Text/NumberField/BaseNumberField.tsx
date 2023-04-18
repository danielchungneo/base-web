import { INumberField } from "@/types/components/inputComponents";
import React, { forwardRef, Ref } from "react";
import { NumericFormat } from "react-number-format";
import BaseTextField from "../TextField/BaseTextField";

const BaseNumberField = (props: INumberField, ref: Ref<HTMLInputElement>) => {
  const {
    onChange,
    onBlur,
    returnValue = "value",
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
    <NumericFormat
      customInput={BaseTextField}
      {...inputProps}
      getInputRef={ref}
      onBlur={internalOnBlur}
      onChange={internalOnChange}
      onValueChange={internalOnValueChange}
      dsiabled={false}
      readOnly={isDisabled} // DO NOT USE `disabled` as RHF will remove the value
    />
  );
};

export default forwardRef(BaseNumberField);
