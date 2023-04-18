import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RadioGroup from "../RadioGroup";

export default {
  title: "Inputs/RadioGroup/States",
  component: RadioGroup,

  argTypes: {
    //
  },
} as ComponentMeta<typeof RadioGroup>;

const defaultOptions = [
  { label: "Email", value: "email" },
  { label: "Phone (SMS)", value: "sms" },
  { label: "Push notification", value: "push" },
];

const Template: ComponentStory<typeof RadioGroup> = args => (
  <RadioGroup
    label="Notifications"
    subLabel="How do you prefer to receive notifications?"
    form={false}
    options={defaultOptions}
    {...args}
  />
);

export const Error = Template.bind({});
Error.args = {
  error: "This field is required",
  value: "sms",
};
