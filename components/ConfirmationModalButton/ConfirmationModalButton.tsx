import { useState } from "react";
import Button from "../Buttons/Button";
import Modal from "../Modal";

type ConfirmationModalButtonProps = {
  buttonProps: any;
  cancelButtonProps?: any;
  children: any;
  confirmButtonProps?: any;
  disabled?: boolean;
  modalProps: {
    title: string;
    body: any;
    onConfirm: () => void;
    confirmButtonText?: string;
  };
};

function ConfirmationModalButton ({
  buttonProps,
  cancelButtonProps,
  children,
  confirmButtonProps,
  disabled,
  modalProps: { title, body, onConfirm, confirmButtonText },
}: ConfirmationModalButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        disabled={disabled}
        {...buttonProps}
      >
        {children}
      </Button>

      <Modal
        show={showModal}
        onCloseModal={() => setShowModal(false)}
        title={title}
      >
        {body}

        <div className="flex flex-row justify-between mt-4">
          <Button
            variant="neutral"
            onClick={() => setShowModal(false)}
            disabled={disabled}
            {...cancelButtonProps}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            className="text-white ms-2"
            disabled={disabled}
            {...confirmButtonProps}
          >
            {confirmButtonText || "Confirm"}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ConfirmationModalButton;
