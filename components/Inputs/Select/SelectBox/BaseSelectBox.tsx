import React, { forwardRef, Ref, useRef } from "react";
import Spinner from "@/components/Loaders/Spinner";
import clsx from "clsx";
import { formatSelectSearch } from "@/utils/form";
import { Listbox, Transition } from "@headlessui/react";
import { HiChevronUpDown, HiCheck } from "react-icons/hi2";
import { HiX, HiPlus } from "react-icons/hi";
import InputDecorator from "@/components/InputDecorators/InputDecorator";
import { ISelectBox } from "@/types/components/inputComponents";
import InputError from "@/components/Errors/InputError/InputError";
import Label from "@/components/Label";

const BaseSelectBox = (
  {
    variant = "primary",
    loading = false,
    options = [],
    valueField = "value",
    labelField = "label",
    clearable = false,
    autoSort = false,
    type = "text",
    disabled = false,
    label,
    srOnly,
    prepend,
    append,
    containerClassName,
    labelClassName,
    createOptionForm: CreateOptionForm,
    onCreateComplete,
    readOnly,
    value,
    name,
    error,
    className,
    children,
    onChange,
    multiple,

    ...inputProps
  }: ISelectBox,
  ref: Ref<HTMLElement>
) => {
  // #region STATE
  //
  // #endregion

  // #region HOOKS
  const buttonRef = useRef();
  // #endregion

  // #region COMPUTED
  let formattedOptions = formatSelectSearch(valueField, labelField, options);

  if (autoSort) {
    formattedOptions = formattedOptions?.sort((a, b) =>
      a[labelField]?.localeCompare(b[labelField])
    );
  }

  const valueObject = formattedOptions?.[multiple ? "filter" : "find"](opt =>
    multiple
      ? (value as string[])?.includes(opt[valueField])
      : opt[valueField] === value
  );

  // #endregion

  // #region FUNCTIONS
  const internalOnChange = updatedValue => {
    const updated = multiple
      ? updatedValue.map(opt => opt[valueField])
      : updatedValue[valueField];

    onChange?.({
      target: {
        name,
        value: updated,
      },
    });
  };

  const handleClear = evt => {
    evt.stopPropagation();
    onChange?.(multiple ? [] : null);

    buttonRef.current.click();
  };

  const handleOpenCreateForm = () => {
    //
  };

  // #endregion

  // #region COMPUTED (function dependent)
  //
  // #endregion

  const isDisabled = readOnly || disabled || loading;
  const isClearable = clearable && !isDisabled;

  const computedClasses = clsx(
    "text-input",
    isDisabled && "input--disabled",
    className
  );

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
          "text-input-controls-container overflow-visible",
          variant,
          !!error && "error"
        )}
      >
        <InputDecorator>{prepend}</InputDecorator>

        <div className="text-input-container block overflow-visible">
          <Listbox
            name={name}
            value={valueObject}
            onChange={internalOnChange}
            disabled={isDisabled}
            by={valueField}
            multiple={multiple}
          >
            {({ open }) => (
              <>
                <Listbox.Button
                  ref={buttonRef}
                  className={computedClasses}
                  disabled={isDisabled}
                >
                  <span className="flex truncate">
                    {multiple
                      ? valueObject?.map(opt => opt[labelField]).join(", ")
                      : valueObject?.[labelField]}
                  </span>

                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <HiChevronUpDown className="h-5 w-5 text-gray-400" />
                  </span>

                  {isClearable && (
                    <div
                      className={clsx(
                        "absolute right-10 top-0 bottom-0 z-10 flex items-center justify-center",
                        !valueObject && "hidden"
                      )}
                    >
                      <HiX
                        onClick={handleClear}
                        className="h-5 w-5 text-gray-400"
                      />
                    </div>
                  )}

                  {loading && (
                    <div className="absolute right-10 top-0 bottom-0 z-10 flex items-center justify-center">
                      <Spinner />
                    </div>
                  )}
                </Listbox.Button>

                <Transition
                  show={open}
                  as={React.Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {formattedOptions.map(opt => (
                      <Listbox.Option
                        key={opt[valueField]}
                        className={({ active }) =>
                          clsx(
                            "relative cursor-default select-none py-2 pl-3 pr-9",
                            active ? "bg-primary text-white" : "text-gray-900"
                          )
                        }
                        value={opt}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={clsx(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {opt[labelField]}
                            </span>

                            {selected ? (
                              <span
                                className={clsx(
                                  active ? "text-white" : "text-primary",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <HiCheck className="h-5 w-5" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </>
            )}
          </Listbox>
        </div>

        <InputDecorator>
          {/* {append} */}
          {(Array.isArray(append) ? append : [append]).concat(
            !!CreateOptionForm ? (
              <div
                className="hover:opacity-50 cursor-pointer h-full w-10 -mx-3 flex justify-center items-center"
                onClick={handleOpenCreateForm}
              >
                <HiPlus className="h-5 w-5 text-gray-400" />
              </div>
            ) : (
              []
            )
          )}
        </InputDecorator>
      </div>

      <InputError>{error}</InputError>
    </fieldset>
  );
};

export default forwardRef(BaseSelectBox);
