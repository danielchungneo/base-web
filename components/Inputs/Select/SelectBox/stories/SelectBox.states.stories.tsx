import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SelectBox from "../SelectBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/SelectBox/State",
  component: SelectBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof SelectBox>;

const options = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "X-Large" },
  { value: "2xl", label: "2X-Large" },
];

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SelectBox> = args => (
  <SelectBox label="Shirt Size" options={options} form={false} {...args} />
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

export const LoadingWithDecorators = Template.bind({});
LoadingWithDecorators.args = {
  label: "Loading",
  prepend: "👕",
  append: "Lookin' good! 😎",
  loading: true,
};

export const Clearable = Template.bind({});
Clearable.args = {
  label: "Clearable",
  clearable: true,
};

export const Error = Template.bind({});
Error.args = {
  error: "This field is required",
};
