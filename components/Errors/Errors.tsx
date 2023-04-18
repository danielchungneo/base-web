import clsx from "clsx";
import Alert from "../Alert";

const Errors = ({ defaultMessage, errors, className }: any) => {
  return (
    Boolean(errors?.length) &&
    (defaultMessage ? (
      <Alert variant="danger" className={clsx("mb-4", className)}>
        {defaultMessage}
      </Alert>
    ) : (
      errors.map((error: any) => (
        <Alert
          key={error.message}
          variant="danger"
          className={clsx("mb-4", className)}
        >
          {error.message ||
            error.Message ||
            defaultMessage ||
            "An error occurred. Please reload the page and try again."}
        </Alert>
      ))
    ))
  );
};

export default Errors;
