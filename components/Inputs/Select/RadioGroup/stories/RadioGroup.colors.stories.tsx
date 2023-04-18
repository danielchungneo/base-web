import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RadioGroup from "../RadioGroup";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/RadioGroup/Colors",
  component: RadioGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof RadioGroup>;

const defaultOptions = [
  { label: "Email", value: "email" },
  { label: "Phone (SMS)", value: "sms" },
  { label: "Push notification", value: "push" },
];

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RadioGroup> = args => (
  <RadioGroup
    label="Notifications"
    subLabel="How do you prefer to receive notifications?"
    form={false}
    options={defaultOptions}
    {...args}
  />
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  value: "sms",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  value: "sms",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  value: "sms",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  value: "sms",
};

export const Warning = Template.bind({});
Warning.args = {
  variant: "warning",
  value: "sms",
};

export const Info = Template.bind({});
Info.args = {
  variant: "info",
  value: "sms",
};

export const Light = Template.bind({});
Light.args = {
  variant: "light",
  value: "sms",
};

export const Dark = Template.bind({});
Dark.args = {
  variant: "dark",
  value: "sms",
};

export const Neutral = Template.bind({});
Neutral.args = {
  variant: "neutral",
  value: "sms",
};
