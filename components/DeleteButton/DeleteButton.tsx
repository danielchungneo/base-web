import useRequest from "@/utils/hooks/useRequest";
import React, { useState } from "react";
import Button from "../Buttons/Button";
import clsx from "clsx";
import { IDeleteButton } from "@/types/components/inputComponents";

function DeleteButton({
  id,
  label,
  disabled,
  icon,
  onError,
  onSuccess,
  request,
  className,
  onShowConfrmDelete,
  ...props
}: IDeleteButton) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const {
    data,
    loading: deleting,
    errors,
    submitRequest,
  } = useRequest(request(id), {
    onSuccess: onDeleteSuccess,
    onError: onDeleteError,
  });

  function onClickDelete() {
    setShowConfirmDelete(true);
    onShowConfrmDelete?.(true);
  }

  function onCancel() {
    setShowConfirmDelete(false);
    onShowConfrmDelete?.(false);
  }

  function onConfirm() {
    submitRequest();
  }

  function onDeleteError(response: any) {
    setShowConfirmDelete(false);
    onShowConfrmDelete?.(false);
    onError?.(response);
  }

  function onDeleteSuccess(response: any) {
    onSuccess?.(response);
  }

  return showConfirmDelete ? (
    <div className={clsx("flex flex-row")}>
      <Button
        variant="neutral"
        disabled={disabled || deleting}
        {...props}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        variant="danger"
        disabled={disabled}
        loading={deleting}
        className={"ml-2"}
        {...props}
        onClick={onConfirm}
      >
        {deleting ? "Deleting..." : "Confirm"}
      </Button>
    </div>
  ) : (
    <Button
      variant="danger"
      disabled={disabled || deleting}
      {...props}
      onClick={onClickDelete}
    >
      {icon || label || "Delete"}
    </Button>
  );
}

export default DeleteButton;
