import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import NumberField from "../NumberField";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/NumberField",
  component: NumberField,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof NumberField>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NumberField> = args => (
  <NumberField
    //
    label="Total Cost"
    placeholder={"0.00"}
    form={false}
    {...args}
  />
);

export const Number = Template.bind({});
Number.args = {
  //
};

export const WithThousandsSeparator = Template.bind({});
WithThousandsSeparator.args = {
  thousandSeparator: true,
};

export const WithInputDecorators = Template.bind({});
WithInputDecorators.args = {
  thousandSeparator: true,
  prepend: "$",
  append: "USD",
};
