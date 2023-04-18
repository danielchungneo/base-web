import Button from "@/components/Buttons/Button";
import Form from "@/components/ContentWrappers/Form";
import Errors from "@/components/Errors";
import TextField from "@/components/Inputs/Text/TextField";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import { commonYupSchemas } from "@/utils/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

// Field definitions
export const REGISTER_FORM_FIELDS = {
  NAME: "name",
  USERNAME: "userName",
  PHONE: "phoneNumber",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
};

// Form Validation
const formValidationSchema = Yup.object({
  [REGISTER_FORM_FIELDS.NAME]: commonYupSchemas.string.required("Required"),
  [REGISTER_FORM_FIELDS.USERNAME]: commonYupSchemas.email.required("Required"),
  [REGISTER_FORM_FIELDS.PHONE]: commonYupSchemas.phone.required("Required"),
  [REGISTER_FORM_FIELDS.PASSWORD]: commonYupSchemas.password(true),
  [REGISTER_FORM_FIELDS.CONFIRM_PASSWORD]: commonYupSchemas
    .password(true)
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

// Prop Typescript
type RegisterFormPropTypes = {
  //
};

const inputClassNames = "bg-slate-800 text-white";
const inputLabelClassNames = "text-left text-gray-400 border-0";
const inputContainerClassNames = "border-0";

const defaultValues = {};

function RegisterForm(props: RegisterFormPropTypes) {
  /**
   * HOOKS
   */
  const router = useRouter();
  const {
    data: saveData,
    loading: saving,
    errors: savingErrors,
    submitRequest: createAccount,
  } = useRequest(api.auth.users.register(), {
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

  /**
   * FUNCTIONS
   */
  function onError(response: any) {
    toast.error("Failed to create account.");
  }

  function onSubmit(values: any) {
    createAccount(values);
  }

  function onSuccess(response: any) {
    toast.success("Registration complete");
    router.replace("/");
  }

  return (
    <div className="z-10 p-6 md:p-12 rounded-lg max-w-2xl h-auto text-center md:text-left">
      <FormProvider {...formMethods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <div className="text-3xl md:text-5xl text-white font-bold">
              Register Account
            </div>
            <div className="text-gray-400 mt-5 text-lg">
              We&apos;ll start with the basics. You can add more details later.
            </div>
          </div>

          <div className="mb-4 mt-12">
            <TextField
              label="Name"
              name={REGISTER_FORM_FIELDS.NAME}
              className={inputClassNames}
              labelClassName={inputLabelClassNames}
              inputContainerClassName={inputContainerClassNames}
            />
          </div>

          <div className="mb-4">
            <TextField
              label="Email"
              name={REGISTER_FORM_FIELDS.USERNAME}
              className={inputClassNames}
              labelClassName={inputLabelClassNames}
              containerClassName={inputContainerClassNames}
              inputContainerClassName={inputContainerClassNames}
            />
          </div>

          <div className="my-4">
            <TextField
              label="Phone Number"
              name={REGISTER_FORM_FIELDS.PHONE}
              className={inputClassNames}
              labelClassName={inputLabelClassNames}
              containerClassName={inputContainerClassNames}
              inputContainerClassName={inputContainerClassNames}
            />
          </div>
          <div className="my-4">
            <TextField
              label="Password"
              type="password"
              name={REGISTER_FORM_FIELDS.PASSWORD}
              className={inputClassNames}
              labelClassName={inputLabelClassNames}
              containerClassName={inputContainerClassNames}
              inputContainerClassName={inputContainerClassNames}
            />
          </div>

          <div className="my-4">
            <TextField
              label="Confirm Password"
              type="password"
              name={REGISTER_FORM_FIELDS.CONFIRM_PASSWORD}
              className={inputClassNames}
              labelClassName={inputLabelClassNames}
              containerClassName={inputContainerClassNames}
              inputContainerClassName={inputContainerClassNames}
            />
          </div>

          <div className="text-gray-400 text-left pt-4">
            <span className="text-gray-400">Password Requirements:</span>
            <ul className="list-[circle] ml-4">
              <li className="mt-1.5">Is longer than 6 characters</li>
              <li className="mt-1.5">Contains at least one uppercase letter</li>
              <li className="mt-1.5">Contains at least one number</li>
              <li className="mt-1.5">
                Contains at least one non alphanumeric character
              </li>
            </ul>
          </div>

          <Errors errors={savingErrors} className="mt-4" />

          <div className="flex flex-col pt-4 md:flex-row-reverse">
            <Button
              type="submit"
              disabled={saving}
              label={saving ? "Registering account..." : "Register Account"}
              className="md:flex-1"
            />

            <Button
              label="Back to login"
              variant="neutral"
              onClick={() => router.replace("/auth/login")}
              className="mt-4 md:mt-0 md:flex-1 md:mr-4"
            />
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}

export default RegisterForm;
