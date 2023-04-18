import Label from "@/components/Label";
import clsx from "clsx";
import React, { forwardRef, Ref } from "react";
import { IRadioGroup } from "@/types/components/inputComponents";
import InputError from "@/components/Errors/InputError/InputError";

const BaseRadioGroup = (
  {
    variant = "primary",
    size = "md",
    loading = false,
    options = [],
    valueField = "value",
    labelField = "label",
    disabled = false,
    readOnly,
    label,
    subLabel,
    srOnly,
    containerClassName,
    labelClassName,
    subLabelClassName,
    value,
    name,
    error,
    type,
    className,
    children,
    defaultChecked,
    checked,
    onChange,

    ...inputProps
  }: IRadioGroup,
  ref: Ref<HTMLInputElement>
) => {
  const isDisabled = readOnly || disabled || loading;

  const computedClasses = clsx(
    "radio-group-input",
    size,
    variant,
    isDisabled && "input--disabled",
    // isDisabled && "input--disabled-checkbox-and-radio",
    className
  );

  const internalOnChange = (event: any) => {
    /**
     * ! since radios can't be `readOnly` (only `disabled`, which leads RHF to remove the value completely), we fake readOnly state by turning off pointer  events.
     * ! in the case that a user reanables pointer events in the CSS, ensure the onChange only fires when wanted
     *  */
    if (!isDisabled) {
      onChange?.(event);
    }
  };

  return (
    <fieldset className={clsx("flex flex-col items-start", containerClassName)}>
      {!!srOnly && <legend className="sr-only">{srOnly}</legend>}

      <Label variant="i1" className={clsx(labelClassName, !!error && "error")}>
        {label}
      </Label>
      <Label variant="i2" className={clsx("mt-1", subLabelClassName)}>
        {subLabel}
      </Label>

      <div className="flex flex-col space-y-4 mt-4">
        {options.map((option, optionIndex) => {
          const optionValue = option[valueField];
          const optionLabel = option[labelField];
          const optionId = `${name}-${optionIndex}`;
          const isChecked = optionValue == value;

          return (
            <div key={optionValue} className="flex items-center">
              <input
                id={optionId}
                name={name}
                ref={ref}
                type="radio"
                className={computedClasses}
                checked={isChecked}
                {...inputProps}
                value={optionValue}
                onChange={internalOnChange}
              />
              <Label
                variant="i1"
                htmlFor={optionId}
                className="ml-3 text-gray-800 cursor-pointer"
              >
                {optionLabel}
              </Label>
            </div>
          );
        })}
      </div>

      <InputError>{error}</InputError>
    </fieldset>
  );
};

export default forwardRef(BaseRadioGroup);
