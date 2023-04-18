import InputError from "@/components/Errors/InputError/InputError";
import Label from "@/components/Label";
import { ICheckbox } from "@/types/components/inputComponents";
import clsx from "clsx";
import { cloneDeep } from "lodash";
import React, { forwardRef, Ref } from "react";

const BaseCheckbox = (
  {
    size = "md",
    variant = "primary",
    loading = false,
    disabled = false,
    readOnly,
    label,
    subLabel,
    srOnly,
    containerClassName,
    labelClassName,
    subLabelClassName,
    name,
    error,
    type,
    className,
    children,
    defaultChecked,
    checked: checkedProp,
    value,
    onChange,

    ...inputProps
  }: ICheckbox,
  ref: Ref<HTMLInputElement>
) => {
  const isDisabled = readOnly || disabled || loading;
  const checked: boolean = checkedProp ?? !!value;

  const computedClasses = clsx(
    "checkbox-input",
    size,
    variant,
    isDisabled && "input--disabled",
    // isDisabled && "input--disabled-checkbox-and-radio",
    className
  );

  const internalOnChange = evt => {
    const eventOverride = {
      ...evt,
      target: {
        name: evt.target.name,
        checked: evt.target.checked,
        value: evt.target.checked,
      },
    };

    /**
     * ! since checkboxes can't be `readOnly` (only `disabled`, which leads RHF to remove the value completely), we fake readOnly state by turning off pointer  events.
     * ! in the case that a user reanables pointer events in the CSS, ensure the onChange only fires when wanted
     *  */
    if (!isDisabled) {
      onChange(eventOverride);
    }
  };

  return (
    <fieldset className={clsx("flex flex-col items-start", containerClassName)}>
      {!!srOnly && <legend className="sr-only">{srOnly}</legend>}

      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            name={name}
            ref={ref}
            id={name}
            type="checkbox"
            className={computedClasses}
            defaultChecked={defaultChecked}
            onChange={internalOnChange}
            disabled={isDisabled}
            {...inputProps}
          />
        </div>

        <div className="ml-3 text-sm cursor-pointer">
          <Label
            variant="i1"
            htmlFor={name}
            className={clsx(labelClassName, !!error && "error")}
          >
            {label}
          </Label>
          <Label
            variant="i2"
            htmlFor={name}
            className={clsx(subLabelClassName)}
          >
            {subLabel}
          </Label>
        </div>
      </div>

      <InputError>{error}</InputError>
    </fieldset>
  );
};

export default forwardRef(BaseCheckbox);
