import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AvatarPicker from "../AvatarPicker";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/AvatarPicker/Colors",
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

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
};

export const Warning = Template.bind({});
Warning.args = {
  variant: "warning",
};

export const Info = Template.bind({});
Info.args = {
  variant: "info",
};

export const Light = Template.bind({});
Light.args = {
  variant: "light",
};

export const Dark = Template.bind({});
Dark.args = {
  variant: "dark",
};

export const Neutral = Template.bind({});
Neutral.args = {
  variant: "neutral",
};
