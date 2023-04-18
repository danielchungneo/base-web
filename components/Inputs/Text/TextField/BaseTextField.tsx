import InputError from "@/components/Errors/InputError/InputError";
import InputDecorator from "@/components/InputDecorators/InputDecorator";
import Label from "@/components/Label";
import Spinner from "@/components/Loaders/Spinner";
import { ITextField } from "@/types/components/inputComponents";
import clsx from "clsx";
import React, { forwardRef, Ref } from "react";

const BaseTextField = (
  {
    variant = "primary",
    loading = false,
    as = "input",
    type = "text",
    disabled = false,
    readOnly,
    size = "md",
    prepend,
    append,
    labelClassName,
    containerClassName,
    inputContainerClassName,
    inputControlsContainerClassName,
    label,
    srOnly,
    name,
    error,
    className,
    children,
    defaultChecked,

    ...inputProps
  }: ITextField,
  ref: Ref<HTMLInputElement>
) => {
  const isDisabled = readOnly || disabled || loading;

  const computedClasses = clsx(
    "text-input",
    isDisabled && "input--disabled",
    className
  );

  const renderedInput = React.createElement(as, {
    name,
    ref,
    type,
    className: computedClasses,
    defaultChecked,
    disabled: false,
    readOnly: isDisabled, // DO NOT USE `disabled` as RHF will remove the value
    ...inputProps,
  });

  return (
    <fieldset className={containerClassName}>
      {!!srOnly && <legend className="sr-only">{srOnly}</legend>}

      <Label
        variant="i1"
        htmlFor={name}
        className={clsx(labelClassName, !!error && "error")}
      >
        {label}
      </Label>

      <div
        className={clsx(
          "text-input-controls-container",
          inputControlsContainerClassName,
          variant,
          size,
          !!error && "error"
        )}
      >
        <InputDecorator>{prepend}</InputDecorator>

        <div className={clsx("text-input-container", inputContainerClassName)}>
          {renderedInput}

          {loading && (
            <div className="absolute right-3 top-0 bottom-0 z-10 flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>

        <InputDecorator>{append}</InputDecorator>
      </div>

      <InputError>{error}</InputError>
    </fieldset>
  );
};

export default forwardRef(BaseTextField);
