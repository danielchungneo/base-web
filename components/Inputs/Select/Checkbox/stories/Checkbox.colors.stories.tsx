import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Checkbox from "../Checkbox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/Checkbox/Colors",
  component: Checkbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof Checkbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Checkbox> = args => (
  <Checkbox
    label="Comments"
    subLabel="Get notified by email when someone replies to your comment."
    form={false}
    {...args}
  />
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  defaultChecked: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  defaultChecked: true,
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  defaultChecked: true,
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  defaultChecked: true,
};

export const Warning = Template.bind({});
Warning.args = {
  variant: "warning",
  defaultChecked: true,
};

export const Info = Template.bind({});
Info.args = {
  variant: "info",
  defaultChecked: true,
};

export const Light = Template.bind({});
Light.args = {
  variant: "light",
  defaultChecked: true,
};

export const Dark = Template.bind({});
Dark.args = {
  variant: "dark",
  defaultChecked: true,
};

export const Neutral = Template.bind({});
Neutral.args = {
  variant: "neutral",
  defaultChecked: true,
};
