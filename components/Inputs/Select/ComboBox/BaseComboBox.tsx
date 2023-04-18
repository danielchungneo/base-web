import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
import Spinner from "@/components/Loaders/Spinner";
import clsx from "clsx";
import { formatSelectSearch } from "@/utils/form";
import { Combobox, Transition } from "@headlessui/react";
import { HiChevronUpDown, HiCheck } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import InputDecorator from "@/components/InputDecorators/InputDecorator";
import { IComboBox } from "@/types/components/inputComponents";
import InputError from "@/components/Errors/InputError/InputError";
import Label from "@/components/Label";

const BaseComboBox = (
  {
    variant = "primary",
    loading = false,
    options = [],
    valueField = "value",
    labelField = "label",
    value = null,
    clearable = false,
    autoSort = false,
    type = "text",
    disabled = false,
    multiple = false,
    label,
    srOnly,
    prepend,
    append,
    containerClassName,
    labelClassName,
    createOptionForm: CreateOptionForm,
    onCreateComplete,
    readOnly,
    name,
    error,
    className,
    children,
    onChange,

    ...inputProps
  }: IComboBox,
  ref: Ref<HTMLElement>
) => {
  // #region STATE
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  // #endregion

  // #region HOOKS
  const inputRef = useRef();
  const buttonRef = useRef();
  // #endregion

  // #region COMPUTED
  const formattedOptions = formatSelectSearch(valueField, labelField, options);

  let filteredOptions =
    query === ""
      ? formattedOptions
      : formattedOptions.filter(option =>
          option[labelField]
            ?.toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  if (autoSort) {
    filteredOptions = filteredOptions?.sort((a, b) =>
      a[labelField]?.localeCompare(b[labelField])
    );
  }

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
    onChange?.({
      target: {
        name,
        value: multiple ? [] : null,
      },
    });

    buttonRef.current.click();
  };

  const handleInputFocus = () => {
    const dataset = inputRef.current?.dataset ?? {};

    const isOpen = dataset?.headlessuiState === "open";
    const isFocused =
      document.hasFocus(inputRef.current?.parentElement) ||
      document.hasFocus(inputRef.current?.parentElement.parentElement);

    if (!isOpen) {
      buttonRef.current.click();
    }
  };

  const handleUnselectMultiOption = option => evt => {
    // prevent from firing the onChange event with the same options in it
    evt.preventDefault();
    evt.stopPropagation();

    setSelectedOption(prev =>
      prev.filter(prevOption => prevOption[valueField] !== option[valueField])
    );
  };
  // #endregion

  // #region EFFECTS
  useEffect(() => {
    const valueObject = formattedOptions?.[multiple ? "filter" : "find"](opt =>
      multiple
        ? (value as string[])?.includes(opt[valueField])
        : opt[valueField] === value
    );

    setSelectedOption(valueObject);
  }, [value, options]);
  // #endregion

  const isDisabled = readOnly || disabled || loading;
  const isClearable = clearable && !isDisabled;

  const computedClasses = clsx(
    isClearable ? "pr-20" : "pr-10",
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
          <Combobox
            name={name}
            value={selectedOption}
            onChange={internalOnChange}
            disabled={isDisabled}
            {...(multiple ? { multiple: true } : {})}
          >
            {({ open }) => {
              return (
                <>
                  <Combobox.Input
                    ref={inputRef}
                    onFocus={handleInputFocus}
                    className={computedClasses}
                    onChange={event => setQuery(event.target.value)}
                    displayValue={option => {
                      if (multiple) {
                        return selectedOption
                          ?.map(opt => opt[labelField])
                          .join(", ");
                      }

                      return selectedOption?.[labelField];
                    }}
                    multiple
                    disabled={
                      isDisabled || (multiple && selectedOption?.length > 1)
                    } // can use disabled here as this input is not monitored by RHF
                  />

                  {isClearable && (
                    <div
                      className={clsx(
                        "absolute right-10 top-0 bottom-0 z-10 flex items-center justify-center",
                        !selectedOption && "hidden"
                      )}
                    >
                      <HiX
                        onClick={handleClear}
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  {loading && (
                    <div className="absolute right-10 top-0 bottom-0 z-10 flex items-center justify-center">
                      <Spinner />
                    </div>
                  )}

                  <Combobox.Button
                    ref={buttonRef}
                    className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
                    disabled={isDisabled}
                    onClick={evt => {
                      console.log("Combobox.Button onClick");

                      // prevent input focus event from firing and opening the dropdown open
                      evt.stopPropagation();
                      open && evt.preventDefault();
                    }}
                  >
                    <HiChevronUpDown
                      className="h-5 w-5 text-gray-400"
                      // aria-hidden="true"
                    />
                  </Combobox.Button>

                  <Transition
                    show={open}
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options
                      static
                      className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      {!!filteredOptions.length ? (
                        filteredOptions.map(option => {
                          const selected = !!(multiple
                            ? selectedOption?.find(
                                opt => opt[valueField] === option[valueField]
                              )
                            : selectedOption?.[valueField] ===
                              option[valueField]);

                          return (
                            <Combobox.Option
                              key={option[valueField]}
                              value={option}
                              className={({ active }) =>
                                clsx(
                                  "relative cursor-default select-none py-2 pl-3 pr-9",
                                  active
                                    ? "bg-primary text-white"
                                    : "text-gray-900"
                                )
                              }
                              onClick={
                                multiple && selected // need to this manually remove the selected option
                                  ? handleUnselectMultiOption(option)
                                  : undefined
                              }
                            >
                              {({ active }) => {
                                return (
                                  <>
                                    <span
                                      className={clsx(
                                        "block truncate",
                                        selected && "font-semibold"
                                      )}
                                    >
                                      {option[labelField]}
                                    </span>

                                    {selected && (
                                      <span
                                        className={clsx(
                                          "absolute inset-y-0 right-0 flex items-center pr-4",
                                          active ? "text-white" : "text-primary"
                                        )}
                                      >
                                        <HiCheck
                                          //
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    )}
                                  </>
                                );
                              }}
                            </Combobox.Option>
                          );
                        })
                      ) : (
                        <Combobox.Option
                          value={null}
                          disabled
                          className="relative cursor-default select-none py-2 pl-3 pr-9"
                        >
                          <span
                            className={clsx("block truncate text-gray-500")}
                          >
                            No options available
                          </span>
                        </Combobox.Option>
                      )}
                    </Combobox.Options>
                  </Transition>
                </>
              );
            }}
          </Combobox>
        </div>

        <InputDecorator>{append}</InputDecorator>
      </div>

      <InputError>{error}</InputError>
    </fieldset>
  );
};

export default forwardRef(BaseComboBox);
