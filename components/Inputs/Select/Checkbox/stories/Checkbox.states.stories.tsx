import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Checkbox from "../Checkbox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/Checkbox/States",
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

export const Error = Template.bind({});
Error.args = {
  error: "This field is required",
};
