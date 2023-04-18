import Errors from "@/components/Errors";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

import Button from "@/components/Buttons/Button/Button";
import TextField from "@/components/Inputs/Text/TextField";
import Form from "@/components/ContentWrappers/Form";

// Field definitions
export const PASSWORD_FORM_FIELDS = {
  EMAIL: "email",
};

// Form Validation
const formValidationSchema = Yup.object({
  [PASSWORD_FORM_FIELDS.EMAIL]: Yup.string().email().required(),
});

// Prop Typescript
type PasswordResetRequestFormPropTypes = {
  revalidateCache?: () => void;
  title?: string;
  loading?: boolean;
};

const inputClassNames = "bg-slate-800 text-white";
const inputLabelClassNames = "text-left text-gray-400 border-0";
const inputContainerClassNames = "border-0";

function PasswordResetRequestForm({
  revalidateCache,
  loading = false,
  title,
}: PasswordResetRequestFormPropTypes) {
  const router = useRouter();
  const defaultValues = { active: true };

  // State Variables
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState();

  // API Calls
  const {
    data: requestData,
    loading: requesting,
    errors: requestingErrors,
    submitRequest: requestResetPassword,
  } = useRequest(api.auth.users.resetPasswordRequest(), {
    onSuccess,
    onError,
  });

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

  function onCancel() {
    router.back();
  }

  function onError(response: any) {
    toast.error("Failed to save changes.");
  }

  function onSubmit(values: any) {
    setEmail(values.email);
    requestResetPassword(values);
  }

  function onSuccess(response: any) {
    setEmailSent(true);
    revalidateCache?.();
    toast.success("Email sent.");
  }

  return (
    <div className="z-10 p-6 md:p-12 rounded-lg max-w-2xl h-auto text-center md:text-left">
      {emailSent ? (
        <React.Fragment>
          <div className="text-5xl text-white font-bold">Email sent!</div>
          <div className="text-gray-400 mt-5">
            Instructions to reset your password have been sent to{" "}
            <strong>{email}</strong>
          </div>

          <div className="mt-6 flex justify-center md:justify-start">
            <Link href="/auth/login" passHref>
              <Button label="Back to Login" />
            </Link>
          </div>
        </React.Fragment>
      ) : (
        <>
          <div>
            <div className="text-4xl md:text-5xl text-white font-bold">
              {title}
            </div>
            <div className="text-gray-400 mt-5">
              Don&apos;t worry, we&apos;ll send you an email with instructions
              to reset it.
            </div>
          </div>

          <FormProvider {...formMethods}>
            <Form onSubmit={handleSubmit(onSubmit)} className="mt-12">
              <TextField
                label="Email Address"
                name={PASSWORD_FORM_FIELDS.EMAIL}
                className={inputClassNames}
                labelClassName={inputLabelClassNames}
                inputContainerClassName={inputContainerClassNames}
              />

              <Errors errors={requestingErrors} />

              <div className="flex flex-col pt-12 md:flex-row-reverse">
                <Button
                  className="md:flex-1"
                  type="submit"
                  disabled={loading || requesting}
                  label={requesting ? "Sending Email..." : "Send Email"}
                />

                <Button
                  label="Back to Login"
                  variant="neutral"
                  className="mt-4 md:mt-0 md:flex-1 md:mr-4"
                  type="button"
                  onClick={() => router.back()}
                />
              </div>
            </Form>
          </FormProvider>
        </>
      )}
    </div>
  );
}

export default PasswordResetRequestForm;
