import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DateTime from "../DateTime";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/DateTime/Generic",
  component: DateTime,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof DateTime>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DateTime> = args => (
  <DateTime label="Birthday" form={false} {...args} />
);

export const Today = Template.bind({});
Today.args = {
  value: new Date(),
};

export const TodayDateOnly = Template.bind({});
TodayDateOnly.args = {
  value: new Date(),
  showTime: false,
};

export const TodayTimeOnly = Template.bind({});
TodayTimeOnly.args = {
  value: new Date(),
  showDate: false,
};

export const PrependDecorator = Template.bind({});
PrependDecorator.args = {
  value: new Date(),
  prepend: "📅",
};

export const AppendDecorator = Template.bind({});
AppendDecorator.args = {
  value: new Date(),
  append: "📅",
};

export const PrependAndAppendDecorator = Template.bind({});
PrependAndAppendDecorator.args = {
  value: new Date(),
  prepend: "📅",
  append: "Happy Birthday! 🎉",
};
