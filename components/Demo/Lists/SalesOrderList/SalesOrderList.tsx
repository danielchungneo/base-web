import AgGrid, { defaultColumnDefOptions } from "@/components/AgGrid";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import { useRouter } from "next/router";

const columnDefs = [
  {
    headerName: "Type",
    field: "salesOrderType.name",
    ...defaultColumnDefOptions.text,
  },
  {
    headerName: "Status",
    field: "salesOrderStatus.name",
    ...defaultColumnDefOptions.text,
  },
  {
    headerName: "Notes",
    field: "notes",
    ...defaultColumnDefOptions.text,
  },
  {
    headerName: "Created",
    field: "createdOn",
    ...defaultColumnDefOptions.datetime,
  },
];

// Props Definition
type SalesOrderListProps = {
  //
};

function SalesOrderList(props: SalesOrderListProps) {
  // Router
  const router = useRouter();

  // API Calls
  const {
    data: salesOrders,
    loading,
    errors,
    revalidateCache,
  } = useRequest(api.entities.salesOrders.getAll());

  // Functions
  function onCellClicked(e) {
    router.push(`/demo/sales-orders/${e.data.id}`);
  }

  function onCreate() {
    router.push("/demo/sales-orders/create");
  }

  return (
    <>
      <AgGrid
        columnDefs={columnDefs}
        enableCellClick
        enableCreate
        idField="id"
        loading={loading}
        onCellClicked={onCellClicked}
        onCreate={onCreate}
        title="Sales Orders"
        {...salesOrders}
      />
    </>
  );
}

export default SalesOrderList;
