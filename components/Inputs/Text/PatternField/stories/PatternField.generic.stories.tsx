import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PatternField from "../PatternField";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/PatternField",
  component: PatternField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof PatternField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PatternField> = args => (
  <PatternField
    //
    form={false}
    {...args}
  />
);

export const Telephone = Template.bind({});
Telephone.args = {
  label: "Telephone",
  placeholder: "(___) ___-____",
  format: "(###) ###-####",
  mask: "_",
  prepend: "+1",
};

export const ZipCode = Template.bind({});
ZipCode.args = {
  label: "Zip Code",
  format: "#####",
  mask: "_",
};

export const Error = Template.bind({});
Error.args = {
  label: "Error",
  error: "This field is required",
};
