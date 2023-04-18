import Button from "@/components/Buttons/Button";
import Form from "@/components/ContentWrappers/Form";
import Errors from "@/components/Errors";
import TextField from "@/components/Inputs/Text/TextField";
import Label from "@/components/Label";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import { commonYupSchemas } from "@/utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

// Field definitions
export const PASSWORD_FORM_FIELDS = {
  NEW_PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
};

// Form Validation
const formValidationSchema = Yup.object({
  [PASSWORD_FORM_FIELDS.NEW_PASSWORD]: commonYupSchemas.password(true),
  [PASSWORD_FORM_FIELDS.CONFIRM_PASSWORD]: commonYupSchemas
    .password(true)
    .oneOf(
      [Yup.ref(PASSWORD_FORM_FIELDS.NEW_PASSWORD), null],
      "Password must match"
    ),
});

// Prop Typescript
type PasswordResetFormPropTypes = {
  revalidateCache?: () => void;
  title: string;
  loading?: boolean;
  user: any;
  id: string;
  email?: string | string[];
  token?: string;
  fullScreen?: boolean;
};

function PasswordResetForm({
  id,
  email,
  loading = false,
  revalidateCache,
  title,
  token,
  user,
  fullScreen = false,
}: PasswordResetFormPropTypes) {
  const router = useRouter();
  const userSessionExists = Boolean(id);
  const defaultValues = {
    ...user,
    password: undefined,
  };

  // API Calls
  const {
    data: saveData,
    loading: saving,
    errors: savingErrors,
    submitRequest: savePassword,
  } = useRequest(
    userSessionExists
      ? api.auth.users.save({ path: { id } })
      : api.auth.users.resetPassword({
          query: { token: encodeURIComponent(token) },
        }),
    {
      onSuccess,
      onError,
    }
  );

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
    watch,
    setValue,
    getValues,
    control,
  } = formMethods;

  function onError(response: any) {
    toast.error("Failed to update password.");
  }

  function onSubmit(values: any) {
    savePassword({ email, ...values });
  }

  function onSuccess(response: any) {
    toast.success("Password updated.");
    revalidateCache?.();
    reset();
    if (!userSessionExists) {
      router.push("/auth/login");
    }
  }

  const themeTextClassNames = fullScreen
    ? "text-white text-3xl md:text-5xl font-bold"
    : "fnot-medium";
  const themeNoteTextClassNames = fullScreen ? "text-gray-400" : "";

  const inputClassNames = fullScreen ? "bg-slate-800 text-white" : "";
  const inputLabelClassNames = fullScreen
    ? "text-left text-gray-400 border-0"
    : "";
  const inputContainerClassNames = fullScreen ? "border-0" : "";

  return (
    <div
      className={clsx(
        "z-10 rounded-lg max-w-2xl h-auto text-center md:text-left",
        fullScreen ? "p-6 md:p-12" : "w-full"
      )}
    >
      <FormProvider {...formMethods}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl mx-auto"
        >
          <Label
            variant={fullScreen ? "h3" : "h4"}
            className={fullScreen ? "text-white font-bold" : ""}
          >
            {title}
          </Label>

          <Label
            variant={fullScreen ? "s3" : "s4"}
            className={clsx("mt-5", themeNoteTextClassNames)}
          >
            In order to protect your account, make sure your password:
          </Label>
          <div className={clsx(themeNoteTextClassNames)}>
            <ul className="list-[circle] list-inside text-center md:text-left">
              <li className="mt-1.5">Is longer than 6 characters</li>
              <li className="mt-1.5">Contains at least one uppercase letter</li>
              <li className="mt-1.5">Contains at least one number</li>
              <li className="mt-1.5">
                Contains at least one non alphanumeric character
              </li>
            </ul>
          </div>

          <TextField
            label="New Password"
            type="password"
            name={PASSWORD_FORM_FIELDS.NEW_PASSWORD}
            className={inputClassNames}
            labelClassName={inputLabelClassNames}
            inputContainerClassName={inputContainerClassNames}
          />

          <TextField
            label="Confirm Password"
            type="password"
            name={PASSWORD_FORM_FIELDS.CONFIRM_PASSWORD}
            className={inputClassNames}
            labelClassName={inputLabelClassNames}
            inputContainerClassName={inputContainerClassNames}
          />

          <Errors errors={savingErrors} />

          <div className="flex flex-col pt-4 md:flex-row-reverse">
            <Button
              className={clsx(fullScreen && "md:flex-1")}
              type="submit"
              disabled={loading || saving}
              label={saving ? "Updating Password..." : "Update Password"}
            />

            {fullScreen && (
              <Button
                label="Go to login"
                variant="neutral"
                className="mt-4 md:mt-0 md:flex-1 md:mr-4"
                onClick={() => router.replace("/auth/login")}
              />
            )}
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}

export default PasswordResetForm;
