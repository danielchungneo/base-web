import React from "react";
import clsx from "clsx";
import Spinner from "@/components/Loaders/Spinner";
import { IButton } from "@/types/components/inputComponents";

const spinnerSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

/**
 * Primary UI component for user interaction
 */
const Button = React.memo(
  ({
    // custom props
    size = "md",
    variant = "primary",
    label,
    loading = false,

    // inherited from HTMLButtonElement
    type = "button",
    disabled = false,
    className,
    children,

    ...inputProps
  }: IButton) => {
    const isDisabled = disabled || loading;

    // get the color name from all the boolean color props

    const computedClasses = clsx(
      "btn",
      variant,
      size,
      isDisabled && "button--disabled",
      className
    );

    return (
      <button
        type={type}
        className={computedClasses}
        disabled={disabled}
        {...inputProps}
      >
        <div
          className={clsx(
            "flex flex-row items-center text-base",
            isDisabled && "opacity-50"
          )}
          style={{ minHeight: "1.25rem" }}
        >
          {label || children}
        </div>

        <div className={clsx(!loading && "hidden", "absolute flex")}>
          <Spinner width={spinnerSizes[size]} height={spinnerSizes[size]} />
        </div>
      </button>
    );
  }
);

export default Button;
