import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiInformationCircle,
  HiXCircle,
  HiX,
} from "react-icons/hi";

interface IAlert {
  children: React.ReactNode;
  variant?: "success" | "danger" | "warning" | "info";
  className?: string;
}

const bgClasses = {
  success: "bg-green-50",
  danger: "bg-red-50",
  warning: "bg-yellow-50",
  info: "bg-blue-50",
};

const iconClasses = {
  success: "text-green-400",
  danger: "text-red-400",
  warning: "text-yellow-400",
  info: "text-blue-400",
};

const textClasses = {
  success: "text-green-800",
  danger: "text-red-800",
  warning: "text-yellow-800",
  info: "text-blue-800",
};

const buttonClasses = {
  success:
    "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50",
  danger:
    "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50",
  warning:
    "bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50",
  info: "bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50",
};

const getIcon = (variant: string) => {
  switch (variant) {
    case "success":
      return HiCheckCircle;
    case "danger":
      return HiXCircle;
    case "warning":
      return HiExclamationCircle;
    case "info":
      return HiInformationCircle;
    default:
      return HiXCircle;
  }
};

const Alert = ({ children, variant = "success", className }: IAlert) => {
  const [visible, setVisible] = useState(false);
  const Icon = getIcon(variant);

  useEffect(() => {
    if ((Array.isArray(children) && !!children.length) || !!children) {
      setVisible(true);
    }
  }, [children]);

  if (!visible) {
    return null;
  }

  return (
    <div className={clsx("rounded-md p-4", bgClasses[variant], className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={clsx("h-5 w-5", iconClasses[variant])}
            aria-hidden="true"
          />
        </div>

        <div className="ml-3">
          <p className={clsx("text-sm font-medium", textClasses[variant])}>
            {children}
          </p>
        </div>

        <div className=" pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className={clsx(
                "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2  focus:ring-offset-2",
                buttonClasses[variant]
              )}
              onClick={() => setVisible(false)}
            >
              <span className="sr-only">Dismiss</span>
              <HiX className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
