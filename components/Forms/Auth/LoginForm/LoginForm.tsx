import Button from "@/components/Buttons/Button/Button";
import Form from "@/components/ContentWrappers/Form";
import Errors from "@/components/Errors/Errors";
import TextField from "@/components/Inputs/Text/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

const loginFormValidationSchema = Yup.object({
  email: Yup.string().required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Required"),
});

const inputClassNames = "bg-slate-800 text-white";
const inputLabelClassNames = "text-left text-gray-400 border-0";
const inputContainerClassNames = "border-0";

export default function LoginForm({ csrfToken, showRegisterAccount = false }) {
  const router = useRouter();
  const formMethods = useForm({
    resolver: yupResolver(loginFormValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit } = formMethods;

  const { status } = useSession({
    required: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isCredentialsSignInError = router.query.error === "CredentialsSignin";
  const isLoading = status === "loading" || isSubmitting;

  async function onSubmit(values: any, e: any) {
    setIsSubmitting(true);
    signIn("credentials", {
      email: values.email,
      password: values.password,
      csrfToken,
      callbackUrl: "/",
    });
  }

  return (
    <div className="z-10 p-6 md:p-12 rounded-lg max-w-2xl h-auto text-center md:text-left">
      <div className="mb-4">
        <div className=" text-gray-400 uppercase font-bold">Welcome</div>
        <div className="text-4xl md:text-5xl text-white mt-5 font-bold">
          Sign in to your{" "}
          <span style={{ whiteSpace: "nowrap" }}>
            account
            <span className="inline-block bg-primary h-2.5 w-2.5 rounded-full" />
          </span>
        </div>
      </div>

      <FormProvider {...formMethods}>
        <Form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "center" }}>
          <div>
            <TextField
              label="Email"
              name="email"
              type="email"
              containerClassName="mt-8"
              className={inputClassNames}
              labelClassName={inputLabelClassNames}
              inputContainerClassName={inputContainerClassNames}
            />

            <div className="pt-4">
              <TextField
                label="Password"
                name="password"
                type="password"
                className={inputClassNames}
                labelClassName={inputLabelClassNames}
                inputContainerClassName={inputContainerClassNames}
              />
            </div>
          </div>
          {isCredentialsSignInError && (
            <Errors
              errors={[
                {
                  message:
                    "The email or password you have entered is incorrect. Please try again.",
                },
              ]}
              className="mt-8"
            />
          )}
          <div className="flex flex-col pt-4 md:flex-row-reverse">
            <Button
              label={isLoading ? "Signing In..." : "Continue"}
              type="submit"
              loading={isLoading}
              className="md:flex-1"
            />

            {showRegisterAccount && (
              <Link href="/auth/register" passHref>
                <Button
                  type="button"
                  variant="neutral"
                  label="Register Account"
                  className="mt-4 md:mt-0 md:flex-1 md:mr-4"
                />
              </Link>
            )}
          </div>
        </Form>
      </FormProvider>

      <div className="mt-8 text-center">
        <Link
          href="/auth/reset-password-request"
          className="text-gray-400 flex-1 inline-flex"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
