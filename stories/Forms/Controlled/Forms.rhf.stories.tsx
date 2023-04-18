import React, { useEffect } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextField from "@/components/Inputs/Text/TextField";
import Button from "@/components/Buttons/Button/Button";
import Checkbox from "@/components/Inputs/Select/Checkbox";
import RadioGroup from "@/components/Inputs/Select/RadioGroup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AvatarSelect from "@/components/Inputs/File/AvatarPicker";
import PatternField from "@/components/Inputs/Text/PatternField";
import SelectBox from "@/components/Inputs/Select/SelectBox";
import NumberField from "@/components/Inputs/Text/NumberField";
import { commonYupSchemas } from "@/utils/yup";
import Errors from "@/components/Errors";
import * as Yup from "yup";
import Label from "@/components/Label";
import DateTime from "@/components/Inputs/DateTime";
import clsx from "clsx";
import Spinner from "@/components/Loaders/Spinner";

const Form = props => {
  return <form {...props} />;
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Forms/RHF",
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = args => {
  const [submittedValues, setSubmittedValues] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(!!args.awaitedValues);

  const formMethods = useForm({
    resolver: !!args.validationSchema
      ? yupResolver(args.validationSchema)
      : undefined,
    defaultValues: args.defaultValues || {},
  });

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors, isSubmitting },
    reset,
    watch,
    setValue,
    getValues,
    control,
  } = formMethods;

  const onSubmit = async evt => {
    evt.preventDefault();

    handleSubmit(async values => {
      setSubmitting(true);

      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmittedValues(values);
      setSubmitting(false);
    })();
  };

  useEffect(() => {
    if (args.awaitedValues) {
      const awaitedValues = args.awaitedValues;

      setTimeout(() => {
        formMethods.reset(awaitedValues);
        setIsLoading(false);
      }, 3000);
    }
  }, []);

  return (
    <FormProvider {...formMethods}>
      <Form
        onSubmit={onSubmit}
        className="space-y-8 divide-y divide-gray-200 max-w-2xl mx-auto"
      >
        {typeof args.children === "function"
          ? args.children({
              isSubmitting,
              isLoading,
            })
          : args.children}

        {!!Object.keys(formErrors).length && (
          <div className="pt-8">
            <Errors errors={formErrors} />
          </div>
        )}

        <div className="py-8">
          <Button type="submit" label="Submit" loading={isSubmitting} />

          {submittedValues && (
            <div className="mt-4">
              {JSON.stringify(submittedValues, null, 2)}
            </div>
          )}
        </div>
      </Form>
    </FormProvider>
  );
};

const LoginForm = ({ defaultValues }: { defaultValues?: any }) => {
  return (
    <Template defaultValues={defaultValues}>
      {(
        {
          // values, onChange
        }
      ) => (
        <div>
          <TextField
            //
            label="Username"
            name="username"
          />

          <div className="pt-8">
            <TextField
              //
              label="Password"
              name="password"
              type="password"
            />
          </div>
        </div>
      )}
    </Template>
  );
};

const ProfileForm = ({
  defaultValues,
  disabled = false,
  awaitedValues,
}: {
  defaultValues?: any;
  awaitedValues?: any;
  disabled?: boolean;
}) => {
  return (
    <Template
      defaultValues={defaultValues}
      validationSchema={Yup.object({
        pushNotifications: commonYupSchemas.nullableNumber,
      })}
      awaitedValues={awaitedValues}
    >
      {({ isLoading }) => {
        return (
          <>
            <div className={clsx(isLoading && "pointer-events-none")}>
              <div>
                <Label variant="h5">Profile</Label>
                <Label variant="s5" className="mt-1">
                  This information will be displayed publicly so be careful what
                  you share.
                </Label>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <TextField
                  label="Username"
                  name="username"
                  containerClassName="sm:col-span-4"
                  prepend="@"
                  disabled={disabled}
                />

                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  containerClassName="sm:col-span-2"
                  disabled={disabled}
                />

                <TextField
                  label="About"
                  name="about"
                  as="textarea"
                  rows={3}
                  containerClassName="sm:col-span-6"
                  disabled={disabled}
                />

                <AvatarSelect
                  label="Change Photo"
                  name="profilePic"
                  containerClassName="sm:col-span-6"
                  variant="neutral"
                  disabled={disabled}
                />
              </div>
            </div>

            <div className="pt-8">
              <div>
                <Label variant="h5">Personal Information</Label>
                <Label variant="s5" className="mt-1">
                  Use a permanent address where you can receive mail.
                </Label>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <TextField
                  label="First name"
                  name="firstName"
                  containerClassName="sm:col-span-3"
                  disabled={disabled}
                />

                <TextField
                  label="Last name"
                  name="lastName"
                  containerClassName="sm:col-span-3"
                  disabled={disabled}
                />

                <DateTime
                  label="Birthday"
                  name="birthday"
                  containerClassName="sm:col-span-3"
                  prepend="📅"
                  append="🎉"
                  showTime={false}
                  disabled={disabled}
                />

                <NumberField
                  label="Age"
                  name="age"
                  containerClassName="sm:col-span-3"
                  append="years old"
                  disabled={disabled}
                />

                <TextField
                  label="Email"
                  name="email"
                  containerClassName="sm:col-span-3"
                  disabled={disabled}
                />

                <PatternField
                  label="Phone"
                  name="phoneNumber"
                  format={"(###) ###-####"}
                  valueIsNumericString
                  containerClassName="sm:col-span-3"
                  disabled={disabled}
                />

                <NumberField
                  label="Salary"
                  name="salary"
                  containerClassName="sm:col-span-3"
                  prepend="$"
                  append="USD"
                  thousandSeparator
                  valueIsNumericString
                  disabled={disabled}
                />

                <NumberField
                  label="Requested Salary"
                  name="requestedSalary"
                  containerClassName="sm:col-span-3"
                  prepend="$"
                  append="USD"
                  thousandSeparator
                  valueIsNumericString
                  disabled={disabled}
                />

                <TextField
                  label="Street address"
                  name="addressLine1"
                  containerClassName="sm:col-span-6"
                  disabled={disabled}
                />

                <TextField
                  label="City"
                  name="city"
                  containerClassName="sm:col-span-2"
                  disabled={disabled}
                />
                <TextField
                  label="State"
                  name="state"
                  containerClassName="sm:col-span-2"
                  disabled={disabled}
                />
                <PatternField
                  label="Zip"
                  name="zip"
                  containerClassName="sm:col-span-2"
                  format="#####"
                  mask="_"
                  disabled={disabled}
                />

                <SelectBox
                  label="Country"
                  name="country"
                  options={[
                    { label: "United States", value: "US" },
                    { label: "Canada", value: "CA" },
                    { label: "Mexico", value: "MX" },
                  ]}
                  containerClassName="sm:col-span-3"
                  disabled={disabled}
                />
              </div>
            </div>

            <div className="pt-8">
              <div>
                <Label variant="h5">Notifications</Label>
                <Label variant="s5" className="mt-1">
                  We'll always let you know about important changes, but you
                  pick what else you want to hear about.
                </Label>
              </div>

              <Label variant="i1" className="mt-6">
                By Email
              </Label>

              <div className="mt-4 space-y-4">
                <Checkbox
                  label="Comments"
                  subLabel="Get notified when someones posts a comment on a posting."
                  name="comments"
                  disabled={disabled}
                />
                <Checkbox
                  label="Candidates"
                  subLabel="Get notified when a candidate applies for a job."
                  name="candidates"
                  disabled={disabled}
                />
                <Checkbox
                  label="Offers"
                  subLabel="Get notified when a candidate accepts or rejects an offer."
                  name="offers"
                  disabled={disabled}
                />
              </div>

              <div className="mt-6">
                <RadioGroup
                  label="Push Notifications"
                  subLabel="These are delivered via SMS to your mobile phone."
                  name="pushNotifications"
                  size="lg"
                  options={[
                    { label: "Everything", value: 1 },
                    { label: "Same as email", value: 2 },
                    { label: "No push notifications", value: 3 },
                  ]}
                  disabled={disabled}
                />
              </div>
            </div>

            {isLoading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-10 !mt-0 flex flex-col justify-center items-center">
                <Spinner width={100} height={100} />
                <span className="mt-5 font-semibold text-white text-xl">
                  Please wait 5 seconds...
                </span>
              </div>
            )}
          </>
        );
      }}
    </Template>
  );
};

export const LoginFormEmpty = () => {
  return <LoginForm />;
};

export const LoginFormWithValues = () => {
  return (
    <LoginForm
      defaultValues={{
        username: "babyjay",
        password: "Test123!",
      }}
    />
  );
};

export const ProfileFormEmpty = () => {
  return <ProfileForm />;
};

const defaultProfileFormValues = {
  username: "babyjay",
  about: "Software Developer @ Moreland Connect",
  profilePic: "",
  password: "Test123!",
  //
  firstName: "Jason",
  lastName: "Barnett",
  email: "jason.barnett@morelandconnect.com",
  birthday: null,
  salary: 25000,
  requestedSalary: 50000,
  phoneNumber: "3307057994",
  // phoneNumber: "(330) 705-7994",
  country: "US",
  addressLine1: "5601 Hudson Drive",
  city: "Hudson",
  state: "Ohio",
  zip: "44236",
  //
  comments: true,
  candidates: false,
  offers: true,
  pushNotifications: 1,
};

export const ProfileFormWithValues = () => {
  return <ProfileForm defaultValues={defaultProfileFormValues} />;
};

export const DisabledProfileFormWithValues = () => {
  return <ProfileForm disabled defaultValues={defaultProfileFormValues} />;
};

export const AwaitedProfileFormWithValues = () => {
  return <ProfileForm awaitedValues={defaultProfileFormValues} />;
};

export const AwaitedDisabledProfileFormWithValues = () => {
  return <ProfileForm disabled awaitedValues={defaultProfileFormValues} />;
};
