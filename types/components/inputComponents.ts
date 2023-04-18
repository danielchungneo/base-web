import { NumericFormatProps, PatternFormatProps } from "react-number-format";
import { IAction } from "../api";
import {
  IColorVariant,
  IComponentSize,
  IEntityId,
  IRequest,
  IThemeableComponent,
} from "./common";

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IComponentSize;
  variant?: IColorVariant;

  /**
   * Button label
   */
  label?: any;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * optional loading state
   */
  loading?: boolean;
}

export interface IDeleteButton extends Omit<IButton, "id"> {
  id: IEntityId;

  icon?: React.ReactNode;
  request: IRequest;
  onSuccess?: (response: any) => void;
  onError?: (response: any) => void;

  /**
   * used for the parent component to be aware if the confirmation UI is shown
   */
  onShowConfrmDelete?: (show: boolean) => void;
}

export interface IOptions {
  /**
   * available options
   */
  options: any[];

  /**
   * value field to use in the option object
   */
  valueField?: string;

  /**
   * label field to use in the option object
   */
  labelField?: string;
}

export interface IInput
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: IComponentSize;
  variant?: IColorVariant;

  /**
   * label to be shown on the input
   */
  label?: any;

  /**
   * controls the loading state
   */
  loading?: boolean;

  /**
   * show error message
   */
  error?: any;

  /**
   * content for screen reader only
   */
  srOnly?: string;

  /**
   * classes for component label
   */
  labelClassName?: string;

  /**
   * classes for component wrapper
   */
  containerClassName?: string;

  /**
   * classes for input container element
   */
  inputContainerClassName?: string;

  /**
   * classes for input controls container element (parent to input container and decorators)
   */
  inputControlsContainerClassName?: string;

  /**
   * use react-hook-form registration instead of self managed state
   */
  form?: boolean;
}

export interface IDecorators {
  /**
   * content to prepend
   */
  prepend?: any | any[];
  /**
   * content to append
   */
  append?: any | any[];
}

export interface ITextField extends IInput, IDecorators {
  /**
   * what HTML element to render
   */
  as?: HTMLInputElement["type"];
}

export interface INumberField
  extends ITextField,
    Omit<NumericFormatProps, "value" | "defaultValue" | "size" | "type"> {
  /**
   * value option to return from onChange
   */
  returnValue?: "value" | "floatValue" | "formattedValue";
}

export interface IPatternField
  extends ITextField,
    Omit<PatternFormatProps, "value" | "defaultValue" | "size" | "type"> {
  /**
   * pattern to validate against
   */
  format: string;

  /**
   * character to use as a placeholder
   */
  mask?: string;

  /**
   * value option to return from onChange
   */
  returnValue?: "value" | "floatValue" | "formattedValue";
}

export interface ISelectBox extends IInput, IDecorators, IOptions {
  /**
   * form to allow entity creation
   */
  createOptionForm?: any;

  /**
   * callback to run when option creation is complete
   */
  onCreateComplete?: any;

  /**
   * whether the user can clear the selection
   */
  clearable?: boolean;

  /**
   * auto sort the options based on the label field
   */
  autoSort?: boolean;
}

export interface IComboBox extends ISelectBox {
  //
}

export interface IRadioGroup extends IInput, IOptions {
  /**
   * secondary label
   */
  subLabel?: any;

  /**
   * class to append to secondary label
   */
  subLabelClassName?: any;
}

export interface ICheckbox extends IInput {
  /**
   * secondary label
   */
  subLabel?: any;

  /**
   * class to append to secondary label
   */
  subLabelClassName?: any;
}

export interface IDateTimePicker extends IInput, IDecorators {
  /**
   * show date picker
   */
  showDate?: boolean;
  /**
   * show time picker
   */
  showTime?: boolean;
}

export interface IAvatarPicker extends IInput {
  //
}

export interface IEntitySelectBox extends Omit<ISelectBox, "options"> {
  request: IAction;
  options?: any[];
}

export interface IEntityComboBox extends Omit<IComboBox, "options"> {
  request: IAction;
  options?: any[];
}
