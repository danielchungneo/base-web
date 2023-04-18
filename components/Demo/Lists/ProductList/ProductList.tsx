import AgGrid, { defaultColumnDefOptions } from "@/components/AgGrid";
import ProductForm from "@/components/Demo/Forms/ProductForm";
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
    headerName: "Price",
    field: "price",
    ...defaultColumnDefOptions.currency,
  },
  {
    headerName: "Description",
    field: "description",
    ...defaultColumnDefOptions.text,
  },
];

// Props Definition
type ProductListProps = {
  //
};

function ProductList(props: ProductListProps) {
  // Router
  const router = useRouter();

  // State
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [activeObject, setActiveObject] = useState(null);

  // API Calls
  const {
    data: products,
    loading,
    errors,
    revalidateCache,
  } = useRequest(api.entities.products.getAll());

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
        title="Products"
        idField="id"
        columnDefs={columnDefs}
        enableCellClick
        onCellClicked={openModal}
        enableCreate
        onCreate={openModal}
        loading={loading}
        {...products}
      />

      {showModal && (
        <FormModal
          activeObject={activeObject}
          activeId={activeId}
          formComponent={ProductForm}
          onCloseModal={closeModal}
          revalidateCache={revalidateCache}
          show={showModal}
          title="Product"
        />
      )}
    </>
  );
}

export default ProductList;
