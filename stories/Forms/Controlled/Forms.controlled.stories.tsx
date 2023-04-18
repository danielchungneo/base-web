import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextField from "@/components/Inputs/Text/TextField";
import Button from "@/components/Buttons/Button/Button";
import SelectBox from "@/components/Inputs/Select/SelectBox";
import Checkbox from "@/components/Inputs/Select/Checkbox";
import RadioGroup from "@/components/Inputs/Select/RadioGroup";
import AvatarSelect from "@/components/Inputs/File/AvatarPicker";
import PatternField from "@/components/Inputs/Text/PatternField";

const Form = props => {
  return <form {...props} />;
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Forms/Controlled",
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = args => {
  const [submittedValues, setSubmittedValues] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [values, setValues] = React.useState(args.defaultValues || {});

  const onChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async evt => {
    evt.preventDefault();
    setSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setSubmittedValues(values);
    setSubmitting(false);
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="space-y-8 divide-y divide-gray-200 max-w-2xl mx-auto"
    >
      {typeof args.children === "function"
        ? args.children({
            values,
            onChange,
            submitting,
          })
        : args.children}

      <div className="py-8">
        <Button type="submit" label="Submit" loading={submitting} />

        {submittedValues && (
          <div className="mt-4">{JSON.stringify(submittedValues, null, 2)}</div>
        )}
      </div>
    </Form>
  );
};

const LoginForm = ({ defaultValues }: { defaultValues?: any }) => {
  return (
    <Template defaultValues={defaultValues}>
      {({ values, onChange }) => (
        <div>
          <TextField
            label="Username"
            name="username"
            form={false}
            value={values.username}
            onChange={onChange}
          />

          <div className="pt-8">
            <TextField
              label="Password"
              name="password"
              form={false}
              type="password"
              value={values.password}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </Template>
  );
};

const ProfileForm = ({ defaultValues }: { defaultValues?: any }) => {
  return (
    <Template defaultValues={defaultValues}>
      {({ values, onChange }) => {
        return (
          <>
            <div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <TextField
                  label="Username"
                  name="username"
                  form={false}
                  value={values.username}
                  onChange={onChange}
                  containerClassName="sm:col-span-4"
                  prepend="@"
                />

                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  form={false}
                  value={values.password}
                  onChange={onChange}
                  containerClassName="sm:col-span-2"
                />

                <TextField
                  label="About"
                  name="about"
                  as="textarea"
                  form={false}
                  rows={3}
                  value={values.about}
                  onChange={onChange}
                  containerClassName="sm:col-span-6"
                />

                <AvatarSelect
                  label="Change Photo"
                  name="profilePic"
                  form={false}
                  value={values.profilePic}
                  onChange={onChange}
                  containerClassName="sm:col-span-6"
                  variant="neutral"
                />
              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Use a permanent address where you can receive mail.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <TextField
                  label="First name"
                  name="firstName"
                  form={false}
                  value={values.firstName}
                  onChange={onChange}
                  containerClassName="sm:col-span-3"
                />

                <TextField
                  label="Last name"
                  name="lastName"
                  form={false}
                  value={values.lastName}
                  onChange={onChange}
                  containerClassName="sm:col-span-3"
                />

                <TextField
                  label="Email"
                  name="email"
                  form={false}
                  value={values.email}
                  onChange={onChange}
                  containerClassName="sm:col-span-3"
                />

                <PatternField
                  label="Phone"
                  name="phoneNumber"
                  form={false}
                  format={"(###) ###-####"}
                  valueIsNumericString
                  value={values.phoneNumber}
                  onChange={onChange}
                  containerClassName="sm:col-span-3"
                />

                <TextField
                  label="Street address"
                  name="addressLine1"
                  form={false}
                  value={values.addressLine1}
                  onChange={onChange}
                  containerClassName="sm:col-span-6"
                />

                <TextField
                  label="City"
                  name="city"
                  form={false}
                  value={values.city}
                  onChange={onChange}
                  containerClassName="sm:col-span-2"
                />
                <TextField
                  label="State"
                  name="state"
                  form={false}
                  value={values.state}
                  onChange={onChange}
                  containerClassName="sm:col-span-2"
                />
                <TextField
                  label="Zip"
                  name="zip"
                  form={false}
                  value={values.zip}
                  onChange={onChange}
                  containerClassName="sm:col-span-2"
                />

                <SelectBox
                  label="Country"
                  name="country"
                  form={false}
                  value={values.country}
                  options={[
                    { label: "United States", value: "US" },
                    { label: "Canada", value: "CA" },
                    { label: "Mexico", value: "MX" },
                  ]}
                  valueField="value"
                  labelField="label"
                  onChange={onChange}
                  containerClassName="sm:col-span-3"
                />
              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Notifications
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  We'll always let you know about important changes, but you
                  pick what else you want to hear about.
                </p>
              </div>

              <div
                className="text-base font-medium text-gray-900 mt-6"
                aria-hidden="true"
              >
                By Email
              </div>

              <div className="mt-4 space-y-4">
                <Checkbox
                  label="Comments"
                  subLabel="Get notified when someones posts a comment on a posting."
                  name="comments"
                  form={false}
                  value={values.comments}
                  onChange={onChange}
                />
                <Checkbox
                  label="Candidates"
                  subLabel="Get notified when a candidate applies for a job."
                  name="candidates"
                  form={false}
                  value={values.candidates}
                  onChange={onChange}
                />
                <Checkbox
                  label="Offers"
                  subLabel="Get notified when a candidate accepts or rejects an offer."
                  name="offers"
                  form={false}
                  value={values.offers}
                  onChange={onChange}
                />
              </div>

              <div className="mt-6">
                <RadioGroup
                  label="Push Notifications"
                  subLabel="These are delivered via SMS to your mobile phone."
                  name="pushNotifications"
                  size="lg"
                  form={false}
                  value={values.pushNotifications}
                  onChange={onChange}
                  options={[
                    { label: "Everything", value: 1 },
                    { label: "Same as email", value: 2 },
                    { label: "No push notifications", value: 3 },
                  ]}
                  valueField="value"
                  labelField="label"
                />
              </div>
            </div>
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

export const ProfileFormWithValues = () => {
  return (
    <ProfileForm
      defaultValues={{
        username: "babyjay",
        about: "Software Developer @ Moreland Connect",
        profilePic: "",
        password: "Test123!",
        //
        firstName: "Jason",
        lastName: "Barnett",
        email: "jason.barnett@morelandconnect.com",
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
      }}
    />
  );
};
