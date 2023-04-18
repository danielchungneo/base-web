import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DateTime from "../DateTime";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/DateTime/States",
  component: DateTime,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof DateTime>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DateTime> = args => (
  <DateTime label="Date" form={false} {...args} />
);

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled",
  disabled: true,
};

export const Loading = Template.bind({});
Loading.args = {
  label: "Loading",
  loading: true,
};

export const LoadingWithRightDecorator = Template.bind({});
LoadingWithRightDecorator.args = {
  label: "Loading",
  append: "🔍",
  loading: true,
};

export const Error = Template.bind({});
Error.args = {
  error: "This field is required",
};

export const ErrorWithDecorators = Template.bind({});
ErrorWithDecorators.args = {
  error: "This field is required",
  prepend: "📅",
  append: "Happy Birthday! 🎉",
};
