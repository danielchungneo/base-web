import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextField from "../TextField";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/TextField/Generic",
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

export const Base = Template.bind({});
Base.args = {
  //
};

export const Prepend = Template.bind({});
Prepend.args = {
  prepend: "http://",
};

export const Append = Template.bind({});
Append.args = {
  append: ".com",
};

export const PrependAndAppend = Template.bind({});
PrependAndAppend.args = {
  prepend: "http://",
  append: ".com",
};
