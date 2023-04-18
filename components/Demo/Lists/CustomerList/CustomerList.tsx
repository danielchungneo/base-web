import AgGrid, { defaultColumnDefOptions } from "@/components/AgGrid";
import CustomerForm from "@/components/Demo/Forms/CustomerForm";
import FormModal from "@/components/FormModal";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import { useRouter } from "next/router";
import { useState } from "react";

const columnDefs = [
  {
    headerName: "Name",
    field: "name",
    sort: "asc",
    ...defaultColumnDefOptions.text,
  },
  {
    headerName: "Description",
    field: "description",
    ...defaultColumnDefOptions.text,
  },
];

// Props Definition
type CustomerListProps = {
  //
};

function CustomerList(props: CustomerListProps) {
  // Router
  const router = useRouter();

  // State
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [activeObject, setActiveObject] = useState(null);

  // API Calls
  const {
    data: customers,
    loading,
    errors,
    revalidateCache,
  } = useRequest(api.entities.customers.getAll());

  function openModal(event: any) {
    setActiveId(event.data?.id || "create");
    setActiveObject(event.data);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <AgGrid
        title="Customers"
        idField="id"
        columnDefs={columnDefs}
        enableCellClick
        onCellClicked={openModal}
        enableCreate
        onCreate={openModal}
        loading={loading}
        {...customers}
      />

      {showModal && (
        <FormModal
          activeObject={activeObject}
          activeId={activeId}
          formComponent={CustomerForm}
          onCloseModal={closeModal}
          revalidateCache={revalidateCache}
          show={showModal}
          title="Customer"
        />
      )}
    </>
  );
}

export default CustomerList;
