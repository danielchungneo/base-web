import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Checkbox from "../Checkbox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/Checkbox/Generic",
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

export const Checked = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Checked.args = {
  defaultChecked: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  defaultChecked: false,
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
