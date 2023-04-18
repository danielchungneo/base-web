import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "../Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Button/Sizes",
  component: Button,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const XS = Template.bind({});
XS.args = {
  label: "XS Button",
  size: "xs",
};

export const SM = Template.bind({});
SM.args = {
  label: "SM Button",
  size: "sm",
};

export const MD = Template.bind({});
MD.args = {
  label: "MD Button",
  size: "md",
};

export const LG = Template.bind({});
LG.args = {
  label: "LG Button",
  size: "lg",
};

export const XL = Template.bind({});
XL.args = {
  label: "XL Button",
  size: "xl",
};
