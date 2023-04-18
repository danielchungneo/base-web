import InputError from "@/components/Errors/InputError/InputError";
import InputDecorator from "@/components/InputDecorators/InputDecorator";
import Label from "@/components/Label";
import Spinner from "@/components/Loaders/Spinner";
import { IDateTimePicker } from "@/types/components/inputComponents";
import clsx from "clsx";
import React, { forwardRef, Ref, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";

const BaseDateTime = (
  {
    variant = "primary",
    loading = false,
    showDate = true,
    showTime = true,
    type = "datetime-local",
    disabled = false,
    readOnly,
    label,
    srOnly,
    prepend,
    append,
    containerClassName,
    labelClassName,
    value,
    name,
    error,
    className,
    children,
    defaultChecked,
    onChange,

    ...inputProps
  }: IDateTimePicker,
  ref: Ref<HTMLInputElement>
) => {
  const isDisabled = readOnly || disabled || loading;

  const computedContainerClasses = clsx(
    "datePickerContainer",
    isDisabled && "input--disabled"
  );

  const computedInputClasses = clsx("text-input");

  const computedClasses = clsx(
    // "text-input",
    // "datePickerContainer",
    isDisabled && "input--disabled",
    className
  );

  const internalOnChange = date => {
    const updatedDate = date?.isValid ? date.toDate() : "";

    onChange({
      target: {
        name,
        value: updatedDate,
      },
    });
    // inputProps.onChange?.(date, true);
  };

  useEffect(() => {
    // If its a date, since the database doesn't store time, the date will always come back at 00:00:00, which will mess up the timing.
    // Often times this will make the date 1 day off, so we have to calculate the offset and add it to the value.
    /* else */ if (
      typeof value === "string" &&
      type === "date" &&
      !!value.length
    ) {
      const utcDate = new Date(value);
      const timezoneOffset = utcDate.getTimezoneOffset() * 60 * 1000;

      const computeWithTimezoneOffset = value.slice(-1) === "Z";

      const localDate = computeWithTimezoneOffset
        ? new Date(utcDate.getTime() - timezoneOffset)
        : new Date(utcDate.getTime());

      const dateObj = new DateObject(localDate);

      // call onChange so any external onChange events fire
      internalOnChange(dateObj);
    }
  }, [value]);

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
          variant,
          !!error && "error"
        )}
      >
        <InputDecorator>{prepend}</InputDecorator>

        <div className={clsx("text-input-container")}>
          <DatePicker
            value={value}
            portal
            disableDayPicker={!showDate}
            calendarPosition="bottom"
            onChange={internalOnChange}
            // format={showTime ? "MM/DD/YYYY h:mm A" : "MM/DD/YYYY"}
            format={[showDate && "MM/DD/YYYY", showTime && "h:mm A"]
              .filter(Boolean)
              .join(" ")}
            plugins={[
              showTime && <TimePicker position="bottom" />,
              showDate && (
                <Toolbar position="bottom" sort={["today", "close"]} />
              ),
            ].filter(Boolean)}
            // render={<InputIcon />}
            containerClassName={computedContainerClasses}
            className={computedClasses}
            readOnly={isDisabled} // DO NOT USE `disabled` as RHF will remove the value
            inputClass={computedInputClasses}
            {...inputProps}
          />

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

export default forwardRef(BaseDateTime);
