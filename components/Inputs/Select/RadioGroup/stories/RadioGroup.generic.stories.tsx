import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RadioGroup from "../RadioGroup";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/RadioGroup/Generic",
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

export const Checked = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Checked.args = {
  //
  value: "sms",
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  //
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  //
  label: undefined,
  subLabel: undefined,
};

export const Label = Template.bind({});
Label.args = {
  subLabel: undefined,
};

export const SubLabel = Template.bind({});
SubLabel.args = {
  label: undefined,
};

export const LabelAndSubLabel = Template.bind({});
LabelAndSubLabel.args = {
  //
};
