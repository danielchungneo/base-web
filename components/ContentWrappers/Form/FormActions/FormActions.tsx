import Button from "@/components/Buttons/Button";
import DeleteButton from "@/components/DeleteButton";
import { IFormActions } from "@/types/components/formComponents";
import { useState } from "react";

const FormActions = ({
  id,
  loading,
  saving,
  onDeleteSuccess,
  onDeleteError,
  onCancel,
  request,
  cancelButtonText = "Cancel",
  saveButtonText = "Save",
  deleteButtonText = "Delete",
}: IFormActions) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <div className="w-full flex flex-row justify-between pt-4">
      <div className="flex-1 flex flex-row">
        {!!id && id !== "create" && request && (
          <DeleteButton
            id={id}
            disabled={loading}
            request={request}
            onSuccess={onDeleteSuccess}
            onError={onDeleteError}
            className="mr-1 text-dark flex-1"
            onShowConfrmDelete={setShowConfirmDelete}
            label={deleteButtonText}
          />
        )}
      </div>

      {!showConfirmDelete && (
        <div className="flex-1 flex flex-row">
          <Button
            variant="neutral"
            disabled={loading}
            className="mr-1 text-dark flex-1"
            onClick={onCancel}
          >
            {cancelButtonText}
          </Button>

          <Button
            //
            disabled={loading}
            loading={saving}
            className="ml-1 flex-1"
            type="submit"
          >
            {saveButtonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FormActions;
