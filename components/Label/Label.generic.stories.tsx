import React from "react";
import { ComponentMeta } from "@storybook/react";
import Label from "./Label";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Labels",

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    //
  },
} as ComponentMeta<typeof Label>;

export const Default = () => {
  return (
    <>
      <Label variant="h1">H1 Headng</Label>
      <Label variant="s1" className="mt-1">
        S1 Sub Headng
      </Label>

      <Label variant="h2" className="mt-10">
        H2 Headng
      </Label>
      <Label variant="s2" className="mt-1">
        S2 Sub Headng
      </Label>

      <Label variant="h3" className="mt-10">
        H3 Headng
      </Label>
      <Label variant="s3" className="mt-1">
        S3 Sub Headng
      </Label>

      <Label variant="h4" className="mt-10">
        H4 Headng
      </Label>
      <Label variant="s4" className="mt-1">
        S4 Sub Headng
      </Label>

      <Label variant="h5" className="mt-10">
        H5 Headng
      </Label>
      <Label variant="s5" className="mt-1">
        S5 Sub Headng
      </Label>

      <Label variant="h6" className="mt-10">
        H6 Headng
      </Label>
      <Label variant="s6" className="mt-1">
        S6 Sub Headng
      </Label>

      <Label variant="i1" className="mt-10">
        I1 Headng
      </Label>
      <Label variant="i2" className="mt-1">
        I2 Sub Headng
      </Label>
    </>
  );
};
