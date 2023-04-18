import Button from "@/components/Buttons/Button";
import DeleteButton from "@/components/DeleteButton";
import Label from "@/components/Label";
import { IFormActions, IFormLabel } from "@/types/components/formComponents";
import { useState } from "react";

const FormLabel = ({ id, children, variant = "h4" }: IFormLabel) => {
  if (!children) return null;

  return (
    <Label
      //
      variant={variant}
    >{`${id === "create" ? "Add" : "Edit"} ${children}`}</Label>
  );
};

export default FormLabel;
