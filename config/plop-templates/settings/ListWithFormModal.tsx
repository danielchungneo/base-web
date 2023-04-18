import AgGrid from "@/components/AgGrid";
import FormModal from "@/components/FormModal";
import {{entityName}}Form from "@/components/Forms/{{entityName}}Form";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Card from "@/components/ContentWrappers/Card";

const columnDefs = [
  {
    headerName: "Name",
    field: "name",
    sort: "asc",
  },
  {
    headerName: "Description",
    field: "description",
  },
];

// Props Definition (move to types file if necessary)
type {{entityName}}Props = {
  //
};

function {{entityName}}List(props: {{entityName}}Props) {
  // Router
  const router = useRouter();

  // State
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [activeObject, setActiveObject] = useState(null);

  // API Calls
  const { data, loading, errors, revalidateCache } = useRequest(
    api.entities.{{camelCasePlural entityName}}.getAll()
  );

  const openModal = useCallback((event: any) => {
    setActiveId(event.data?.id || "create");
    setActiveObject(event.data);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <AgGrid
        title="{{startCasePlural entityName}}"
        idField="id"
        columnDefs={columnDefs}
        enableCellClick
        onCellClicked={openModal}
        enableCreate
        onCreate={openModal}
        loading={loading}
        {...data}
      />

      {showModal && (
        <FormModal
          activeObject={activeObject}
          activeId={activeId}
          formComponent={ {{entityName}}Form}
          onCloseModal={closeModal}
          revalidateCache={revalidateCache}
          show={showModal}
          title="{{startCaseSingular entityName}}"
        />
      )}
    </>
  );
}

export default {{entityName}}List;
