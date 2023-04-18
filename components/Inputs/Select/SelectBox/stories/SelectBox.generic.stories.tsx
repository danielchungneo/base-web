import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SelectBox from "../SelectBox";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Inputs/SelectBox/Generic",
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

export const Single = Template.bind({});
Single.args = {
  value: options[1].value,
};

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  value: options.slice(0, 3).map(opt => opt.value),
};

export const Prepend = Template.bind({});
Prepend.args = {
  value: options[1].value,
  prepend: "👕",
};

export const Append = Template.bind({});
Append.args = {
  value: options[1].value,
  append: "100% cotton, shirt may shrink!",
};

export const PrependAndAppend = Template.bind({});
PrependAndAppend.args = {
  value: options[1].value,
  prepend: "👕",
  append: "100% cotton, shirt may shrink!",
};

export const NoAlphaSorting = Template.bind({});
NoAlphaSorting.args = {
  value: options[1].value,
  defaultSort: false,
};

export const StatefulSingle = () => {
  const [value, setValue] = React.useState(options[1].value);

  return (
    <Template
      //
      clearable
      value={value}
      onChange={evt => {
        setValue(evt.target.value);
      }}
    />
  );
};

export const StatefulMultiple = () => {
  const [value, setValue] = React.useState(
    options.slice(0, 3).map(opt => opt.value)
  );

  return (
    <Template
      //
      multiple
      clearable
      value={value}
      onChange={evt => {
        setValue(evt.target.value);
      }}
    />
  );
};
