// @ts-nocheck

import Select from "react-select";
import CreateableSelect from "react-select/creatable";
import AsyncSelect from "react-select/async";
import debounce from "lodash/debounce";

const defaultControlStyles = {
  error: {
    borderColor: "red",
    borderWidth: 2,
  },
};

const Autocomplete = (props: any) => {
  const {
    value,
    onChange,
    options,
    label,
    placeholder,
    disabled,
    isLoading,
    loading,
    error,
    isMulti,
    isClearable,
    hideLabel,
    createable,
    onCreateOption,
    async,
    loadOptions,
    defaultOptions,
    debounceMs,
    styleOptions,
    controlStyles,
    containerStyles,
    extraProps,
    ...rest
  } = props;

  const selectProps = {
    value,
    onChange,
    placeholder,
    options,
    isClearable,
    isLoading: isLoading || loading,
    isDisabled: disabled || isLoading || loading,
    isMulti,
    styles: {
      control: (style) => [
        { ...style },
        error && defaultControlStyles.error,
        {
          minWidth: 100,
          minHeight: 49 /* matching text & date input heights */,
          border: "1px solid #aaa",
          ...controlStyles,
        },
      ],
      ...styleOptions,
    },
    onCreateOption,
    loadOptions: debounce(loadOptions, debounceMs),
    defaultOptions,
    ...extraProps,
    ...rest,
  };

  return (
    <div style={{ width: "100%", ...containerStyles }}>
      <div>
        {/* {!hideLabel && label} */}
        {/* {isLoading && <CircularProgress style={{ fill: '#aaa', color: '#000' }} size={16} />} */}
      </div>

      {/* {!createable && <Select {...selectProps} />}
      {createable && <CreateableSelect {...selectProps} />} */}

      {createable ? (
        <CreateableSelect {...selectProps} />
      ) : async ? (
        <AsyncSelect {...selectProps} />
      ) : (
        <Select {...selectProps} />
      )}
    </div>
  );
};

// Autocomplete.propTypes = {
//   value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
//   onChange: PropTypes.func.isRequired,
//   options: PropTypes.arrayOf(PropTypes.object),
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
//   disabled: PropTypes.bool,
//   isLoading: PropTypes.bool,
//   error: PropTypes.bool,
//   isMulti: PropTypes.bool,
//   hideLabel: PropTypes.bool,
//   createable: PropTypes.bool,
//   onCreateOption: PropTypes.func,
//   styleOptions: PropTypes.object,
//   controlStyles: PropTypes.object,
//   containerStyles: PropTypes.object,
//   extraProps: PropTypes.object,
//   debounceMs: PropTypes.number,
//   defaultOptions: PropTypes.bool,
// };

Autocomplete.defaultProps = {
  // options: defaultOpts,
  error: false,
  isMulti: false,
  hideLabel: false,
  createable: false,
  styleOptions: {},
  controlStyles: {},
  containerStyle: {},
  extraProps: {},
  debounceMs: 500,
  defaultOptions: true,
};

export default Autocomplete;
