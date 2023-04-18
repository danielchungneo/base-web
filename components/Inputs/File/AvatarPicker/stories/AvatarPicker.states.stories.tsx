import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AvatarPicker from "../AvatarPicker";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/AvatarPicker/States",
  component: AvatarPicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof AvatarPicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AvatarPicker> = args => {
  const [value, setValue] = useState(args.multiple ? [] : null);

  const onChange = e => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <AvatarPicker
      label="Change"
      form={false}
      value={value}
      onChange={onChange}
      {...args}
    />
  );
};

export const Error = Template.bind({});
Error.args = {
  error: "This field is required",
};
