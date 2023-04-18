import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "../Button";
import { IButton } from "@/types/components/inputComponents";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Button/Colors",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args: IButton) => (
  <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Default",
};

export const Primary = Template.bind({});
Primary.args = {
  label: "Primary Button",
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Secondary Button",
  variant: "secondary",
};

export const Success = Template.bind({});
Success.args = {
  label: "Success Button",
  variant: "success",
};

export const Info = Template.bind({});
Info.args = {
  label: "Info Button",
  variant: "info",
};

export const Warning = Template.bind({});
Warning.args = {
  label: "Warning Button",
  variant: "warning",
};

export const Danger = Template.bind({});
Danger.args = {
  label: "Danger Button",
  variant: "danger",
};

export const Light = Template.bind({});
Light.args = {
  label: "Light Button",
  variant: "light",
};

export const Dark = Template.bind({});
Dark.args = {
  label: "Dark Button",
  variant: "dark",
};

export const Neutral = Template.bind({});
Neutral.args = {
  label: "Neutral Button",
  variant: "neutral",
};

export const Link = Template.bind({});
Link.args = {
  label: "Link Button",
  variant: "link",
};
