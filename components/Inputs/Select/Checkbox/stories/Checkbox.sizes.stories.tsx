import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Checkbox from "../Checkbox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/Checkbox/Sizes",
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

export const XS = Template.bind({});
XS.args = {
  defaultChecked: true,
  size: "xs",
};

export const SM = Template.bind({});
SM.args = {
  defaultChecked: true,
  size: "sm",
};

export const MD = Template.bind({});
MD.args = {
  defaultChecked: true,
  size: "md",
};

export const LG = Template.bind({});
LG.args = {
  defaultChecked: true,
  size: "lg",
};

export const XL = Template.bind({});
XL.args = {
  defaultChecked: true,
  size: "xl",
};
