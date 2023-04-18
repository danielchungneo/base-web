import AgGrid, { defaultColumnDefOptions } from "@/components/AgGrid";
import SalesOrderTypeForm from "@/components/Demo/Forms/SalesOrderTypeForm";
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
type SalesOrderTypeListProps = {
  //
};

function SalesOrderTypeList(props: SalesOrderTypeListProps) {
  // Router
  const router = useRouter();

  // State
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [activeObject, setActiveObject] = useState(null);

  // API Calls
  const {
    data: salesOrderTypes,
    loading,
    errors,
    revalidateCache,
  } = useRequest(api.entities.salesOrderTypes.getAll());

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
        title="Sales Order Types"
        idField="id"
        columnDefs={columnDefs}
        enableCellClick
        onCellClicked={openModal}
        enableCreate
        onCreate={openModal}
        loading={loading}
        {...salesOrderTypes}
      />
      {showModal && (
        <FormModal
          activeObject={activeObject}
          activeId={activeId}
          formComponent={SalesOrderTypeForm}
          onCloseModal={closeModal}
          revalidateCache={revalidateCache}
          show={showModal}
          title="Sales Order Type"
        />
      )}
    </>
  );
}

export default SalesOrderTypeList;
