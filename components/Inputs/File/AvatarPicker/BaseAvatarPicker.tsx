import React, { forwardRef, memo, useRef } from "react";
import clsx from "clsx";
import { toBase64 } from "@/utils/data";
import Button from "@/components/Buttons/Button/Button";
import { IAvatarPicker } from "@/types/components/inputComponents";
import InputError from "@/components/Errors/InputError/InputError";
import Label from "@/components/Label";

/**
 * Primary UI component for user interaction
 */
const AvatarPicker = ({
  // custom props
  variant = "primary",
  size = "sm",
  type = "button",
  disabled = false,
  readOnly,
  loading = false,
  label,
  multiple,
  containerClassName,
  labelClassName,
  name,
  className,
  children,
  value,
  onChange,
  error,

  ...inputProps
}: IAvatarPicker) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const isDisabled = readOnly || disabled || loading;

  const computedClasses = clsx(
    "btn ml-5 self-center",
    size,
    variant,
    isDisabled && "input--disabled",
    className
  );

  // #region FUNCTIONS
  const handleClick = () => {
    if (isDisabled) return;

    inputRef.current.click();
  };

  const internalOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    if (multiple) {
      const blobs = await Promise.all(
        Array.from(e.target.files).map(file => {
          return toBase64(file);
        })
      );

      onChange?.({
        ...e,
        target: {
          ...e.target,
          name,
          value: blobs,
        },
      });
    } else {
      const blob = await toBase64(e.target.files[0]);

      onChange?.({
        ...e,
        target: {
          ...e.target,
          name,
          value: blob,
        },
      });
    }
  };
  // #endregion

  return (
    <fieldset className={clsx("flex flex-col items-start", containerClassName)}>
      <Label
        variant="i1"
        htmlFor={name}
        className={clsx(labelClassName, !!error && "error")}
      >
        {label}
      </Label>

      <div className="mt-1 flex flex-row">
        <span className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100 border-2">
          {!!value && (!multiple || !!(value as string[]).length) ? (
            <>
              <img
                src={multiple ? (value as string[])[0] : (value as string)}
                alt="profile"
                className="h-full w-full object-cover"
              />

              {
                // if multiple, show the number of images selected
                multiple && (value as string[]).length > 1 && (
                  <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full flex justify-center items-center text-gray-600 bg-white bg-opacity-75">
                    +{(value as string[]).length}
                  </div>
                )
              }
            </>
          ) : (
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </span>

        <input
          type="file"
          ref={inputRef}
          multiple={multiple}
          accept="image/*"
          {...inputProps}
          readOnly={isDisabled} // DO NOT USE `disabled` as RHF will remove the value
          className="hidden"
          onChange={internalOnChange}
        />

        <Button
          type="button"
          className={computedClasses}
          onClick={handleClick}
          size={size}
          disabled={isDisabled}
          label={
            <span className={clsx(isDisabled && "opacity-50")}>{label}</span>
          }
        />
      </div>

      <InputError>{error}</InputError>
    </fieldset>
  );
};

export default memo(forwardRef(AvatarPicker));
