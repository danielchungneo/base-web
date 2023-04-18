import FormLabel from "../ContentWrappers/Form/FormLabel";
import Modal from "../Modal";

type FormModalProps = {
  activeId?: string | string[];
  activeObject?: any;
  formComponent: any;
  onCloseModal: () => void;
  onSucccess?: (response: any) => void;
  revalidateCache?: () => void;
  show: boolean;
  size?: "xl" | "lg" | "sm";
  title: string;
};

function FormModal ({
  activeObject,
  activeId = "create",
  formComponent: Form,
  onCloseModal,
  onSucccess,
  show,
  title,
  revalidateCache,
  size,
}: FormModalProps) {
  return (
    <Modal
      //
      title={<FormLabel id={activeId}>{title}</FormLabel>}
      show={show}
      onCloseModal={onCloseModal}
    >
      <Form
        // title={title} // leave out as we render it above to be consistent on all form modals
        id={activeId}
        activeObject={activeObject}
        onCloseModal={onCloseModal}
        onSucccess={onSucccess}
        revalidateCache={revalidateCache}
      />
    </Modal>
  );
}

export default FormModal;
