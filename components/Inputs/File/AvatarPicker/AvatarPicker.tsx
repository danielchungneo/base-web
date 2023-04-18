import { IAvatarPicker } from "@/types/components/inputComponents";
import React, { forwardRef, Ref } from "react";
import BaseAvatarPicker from "./BaseAvatarPicker";
import FormAvatarPicker from "./FormAvatarPicker";

function AvatarSelect (props: IAvatarPicker, ref: Ref<HTMLInputElement>) {
  const {
    //
    form = true,
  } = props;

  if (form) {
    return <FormAvatarPicker {...props} />;
  }

  return <BaseAvatarPicker {...props} ref={ref} />;
}

export default forwardRef(AvatarSelect);
