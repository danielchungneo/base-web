import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextField from "../TextField";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/TextField/State",
  component: TextField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof TextField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextField> = args => (
  <TextField
    label="Website"
    placeholder={'domain name e.g. "morelandconnect"'}
    form={false}
    {...args}
  />
);

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Error = Template.bind({});
Error.args = {
  error: "This field is required",
};

export const ErrorWithDecorators = Template.bind({});
ErrorWithDecorators.args = {
  error: "This field is required",
  prepend: "https://",
  append: ".com",
};
