import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RadioGroup from "../RadioGroup";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/RadioGroup/Sizes",
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

export const XS = Template.bind({});
XS.args = {
  size: "xs",
  value: "sms",
};

export const SM = Template.bind({});
SM.args = {
  size: "sm",
  value: "sms",
};

export const MD = Template.bind({});
MD.args = {
  size: "md",
  value: "sms",
};

export const LG = Template.bind({});
LG.args = {
  size: "lg",
  value: "sms",
};

export const XL = Template.bind({});
XL.args = {
  size: "xl",
  value: "sms",
};
