import DeleteButton from "@/components/DeleteButton";
import EntitySelect from "@/components/Inputs/Select/EntitySelect";
import { SALES_ORDER_FORM_FIELDS } from "@/components/Demo/Forms/SalesOrderForm";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/Buttons/Button/Button";
import NumberField from "@/components/Inputs/Text/NumberField";

type SalesOrderLineFormProps = {
  salesOrderLineIndex: number | null;
  salesOrderId: number | string | string[];
  salesOrderLine: any;
  removeSalesOrderLine: (index: number) => void;
  revalidateCache: () => void;
  saving: boolean;
  setValue: (name: string, value: any) => void;
  watch: any;
};

function SalesOrderLineForm ({
  salesOrderId,
  salesOrderLineIndex,
  salesOrderLine,
  removeSalesOrderLine,
  revalidateCache,
  saving,
  setValue,
  watch,
}: SalesOrderLineFormProps) {
  /**
   * CALCULATED
   */
  const salesOrderLineName = `salesOrderLine.${salesOrderLineIndex}.`;
  const existingSalesOrderLine = typeof salesOrderLine.id === "number";
  const watchSalesOrderLineProductId = watch(
    `${salesOrderLineName}${SALES_ORDER_FORM_FIELDS.SALES_ORDER_LINE.PRODUCT_ID}`
  );
  const watchSalesOrderLineQuantity = watch(
    `${salesOrderLineName}${SALES_ORDER_FORM_FIELDS.SALES_ORDER_LINE.QUANTITY}`
  );

  /**
   * HOOKS
   */
  const { data: products } = useRequest(api.entities.products.getAll());

  /**
   * FUNCTIONS
   */
  function onDeleteError (response: any) {
    toast.error("Failed to remove sales order line.");
  }

  function onDeleteSuccess (response: any) {
    removeSalesOrderLine(salesOrderLineIndex);
    revalidateCache();
    toast.success("Sales order line removed.");
  }

  function onClickRemove () {
    removeSalesOrderLine(salesOrderLineIndex);
  }

  function deleteSalesOrderLine (id: string) {
    return api.entities.salesOrderLines.delete({ path: { id } });
  }

  function checkForPrice () {
    if (
      watchSalesOrderLineProductId &&
      watchSalesOrderLineQuantity &&
      products
    ) {
      const product = products.results.find(
        (p: any) => p.id === watchSalesOrderLineProductId
      );

      if (product) {
        const price = (product.price * watchSalesOrderLineQuantity)?.toFixed(2);

        if (price) {
          setValue(
            `${salesOrderLineName}${SALES_ORDER_FORM_FIELDS.SALES_ORDER_LINE.PRICE}`,
            price
          );
        }
      }
    }
  }

  useEffect(() => {
    checkForPrice();
  }, [
    watchSalesOrderLineProductId,
    watchSalesOrderLineQuantity,
    products?.results,
  ]);

  return (
    <>
      <div className="my-4 space-y-4">
        <EntitySelect
          label="Product"
          name={`${salesOrderLineName}${SALES_ORDER_FORM_FIELDS.SALES_ORDER_LINE.PRODUCT_ID}`}
          request={api.entities.products.getAll()}
        />

        <NumberField
          label="Quantity"
          name={`${salesOrderLineName}${SALES_ORDER_FORM_FIELDS.SALES_ORDER_LINE.QUANTITY}`}
        />

        <NumberField
          thousandSeparator
          label="Price"
          name={`${salesOrderLineName}${SALES_ORDER_FORM_FIELDS.SALES_ORDER_LINE.PRICE}`}
          step="0.01"
          prepend="$"
        />
      </div>
      <div className="pt-4">
        {salesOrderId !== "create" && existingSalesOrderLine ? (
          <DeleteButton
            id={salesOrderLine.id}
            disabled={saving}
            request={deleteSalesOrderLine}
            onSuccess={onDeleteSuccess}
            onError={onDeleteError}
          />
        ) : (
          <Button variant="danger" onClick={onClickRemove} disabled={saving}>
            Remove
          </Button>
        )}
      </div>
    </>
  );
}

export default SalesOrderLineForm;
