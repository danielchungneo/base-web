import AgGrid, { defaultColumnDefOptions } from "@/components/AgGrid";
import SalesOrderStatusForm from "@/components/Demo/Forms/SalesOrderStatusForm";
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
type SalesOrderStatusListProps = {
  //
};

function SalesOrderStatusList(props: SalesOrderStatusListProps) {
  // Router
  const router = useRouter();

  // State
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [activeObject, setActiveObject] = useState(null);

  // API Calls
  const {
    data: salesOrderStatuses,
    loading,
    errors,
    revalidateCache,
  } = useRequest(api.entities.salesOrderStatuses.getAll());

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
        title="Sales Order Statuses"
        idField="id"
        columnDefs={columnDefs}
        enableCellClick
        onCellClicked={openModal}
        enableCreate
        onCreate={openModal}
        loading={loading}
        {...salesOrderStatuses}
      />

      {showModal && (
        <FormModal
          activeObject={activeObject}
          activeId={activeId}
          formComponent={SalesOrderStatusForm}
          onCloseModal={closeModal}
          revalidateCache={revalidateCache}
          show={showModal}
          title="Sales Order Status"
        />
      )}
    </>
  );
}

export default SalesOrderStatusList;
