import { get, useFormContext } from "react-hook-form";

export default props => {
  const { formState, register } = useFormContext();

  const registration = register(props.name.toString(), props.registerOptions);
  const error = get(formState.errors, props.name.toString())?.message;

  return {
    registration,
    error,
  };
};
