import DeleteButton from "@/components/DeleteButton";
import EntitySelect from "@/components/Inputs/Select/EntitySelect";
import Errors from "@/components/Errors";
import SalesOrderLineForm from "@/components/Demo/Forms/SalesOrderLineForm";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import useUnsavedValues from "@/utils/hooks/useUnsavedValues";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomerForm from "../CustomerForm";
import SalesOrderTypeForm from "../SalesOrderTypeForm";
import Label from "@/components/Label";
import Button from "@/components/Buttons/Button/Button";
import AddLineItemButton from "@/components/Buttons/Button/AddLineItemButton";
import Form from "@/components/ContentWrappers/Form";
import TextField from "@/components/Inputs/Text/TextField";
import Accordion from "@/components/Accordion";
import FormActions from "@/components/ContentWrappers/Form/FormActions";
import FormLabel from "@/components/ContentWrappers/Form/FormLabel";
import FormFieldArray from "@/components/Inputs/FormFieldArray";

// Field definitions
export const SALES_ORDER_FORM_FIELDS = {
  SALES_ORDER_TYPE_ID: "salesOrderTypeId",
  SALES_ORDER_STATUS_ID: "salesOrderStatusId",
  CUSTOMER_ID: "customerId",
  NOTES: "notes",

  SALES_ORDER_LINE: {
    SALES_ORDER_ID: "salesOrderId",
    PRODUCT_ID: "productId",
    QUANTITY: "quantity",
    PRICE: "price",
  },
};

// Form Validation
const formValidationSchema = Yup.object().shape({
  [SALES_ORDER_FORM_FIELDS.SALES_ORDER_TYPE_ID]: Yup.number().required(),
  [SALES_ORDER_FORM_FIELDS.SALES_ORDER_STATUS_ID]: Yup.number().required(),
  [SALES_ORDER_FORM_FIELDS.CUSTOMER_ID]: Yup.number().required(),
  [SALES_ORDER_FORM_FIELDS.NOTES]: Yup.string().max(5000).nullable(),

  salesOrderLine: Yup.array().of(
    Yup.object().shape({
      [SALES_ORDER_FORM_FIELDS.SALES_ORDER_LINE.SALES_ORDER_ID]:
        Yup.number().nullable(),
      [SALES_ORDER_FORM_FIELDS.SALES_ORDER_LINE.PRODUCT_ID]:
        Yup.number().required(),
      [SALES_ORDER_FORM_FIELDS.SALES_ORDER_LINE.QUANTITY]:
        Yup.number().required(),
      [SALES_ORDER_FORM_FIELDS.SALES_ORDER_LINE.PRICE]: Yup.number().required(),
    })
  ),
});

type SalesOrderFormProps = {
  id: string | string[];
  title: string;
};

function SalesOrderForm ({ id, title }: SalesOrderFormProps) {
  const router = useRouter();
  const defaultValues = {};

  const { data: products } = useRequest(api.entities.products.getAll());

  const {
    data: salesOrder,
    loading: salesOrderLoading,
    errors: salesOrderErrors,
    revalidateCache,
  } = useRequest(api.entities.salesOrders.get({ path: { id } }));

  const {
    data: saveData,
    loading: saving,
    errors: savingErrors,
    submitRequest: saveSalesOrder,
  } = useRequest(api.components.salesOrderForm.save({ path: { id } }), {
    onSuccess,
    onError,
  });

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues,
  });

  const { control, handleSubmit, setValue, watch } = formMethods;

  const {
    isDirty,
    onCancelUnsavedValues,
    onErrorUnsavedValues,
    onSuccessUnsavedValues,
    restoreUnsavedForm,
  } = useUnsavedValues(`SalesOrderForm/${id}`, formMethods);

  const {
    fields: salesOrderLines,
    append: appendSalesOrderLine,
    remove: removeSalesOrderLine,
  } = useFieldArray({
    name: "salesOrderLine" as never,
    control,
  });

  function onCancel () {
    onCancelUnsavedValues();
    router.back();
  }

  function onError (response: any) {
    onErrorUnsavedValues();
    toast.error("Failed to save changes.");
  }

  function onSubmit (values: any) {
    saveSalesOrder(values);
  }

  function onSuccess (response: any) {
    revalidateCache?.();
    toast.success("Changes saved.");
    onSuccessUnsavedValues();
    router.back();
  }

  function onDeleteError (response: any) {
    toast.error("Failed to remove payment.");
  }

  function onDeleteSuccess (response: any) {
    revalidateCache?.();
    toast.success("Payment removed.");
    router.back();
  }

  // Once we fetch the sales order, restore the form
  useEffect(() => {
    if (!salesOrderLoading && salesOrder) {
      restoreUnsavedForm(salesOrder);
    }
  }, [salesOrderLoading]);

  return (
    <>
      <FormProvider {...formMethods}>
        <Form>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 flex flex-row justify-between">
              {!!title && <FormLabel id={id}>{title}</FormLabel>}

              {isDirty && <p className="text-danger">Unsaved changes.</p>}
            </div>

            <EntitySelect
              label="Type"
              name={SALES_ORDER_FORM_FIELDS.SALES_ORDER_TYPE_ID}
              createOptionForm={SalesOrderTypeForm}
              request={api.entities.salesOrderTypes.getAll()}
            />

            <EntitySelect
              label="Status"
              name={SALES_ORDER_FORM_FIELDS.SALES_ORDER_STATUS_ID}
              request={api.entities.salesOrderStatuses.getAll()}
            />

            <EntitySelect
              label="Customer"
              name={SALES_ORDER_FORM_FIELDS.CUSTOMER_ID}
              createOptionForm={CustomerForm}
              request={api.entities.customers.getAll()}
            />

            <TextField
              label="Notes"
              name={SALES_ORDER_FORM_FIELDS.NOTES}
              maxLength={5000}
              as="textarea"
              style={{ height: "100px" }}
              containerClassName="col-span-2"
            />

            <div className="col-span-1" />

            <FormFieldArray
              className="col-span-3"
              title="Sales Order Lines"
              items={salesOrderLines}
              renderAccordionTitle={(item: any, index: number) => (
                <>
                  <div>
                    {item.quantity || 0}
                    {" - "}
                    {products?.results.find(
                      product => product.id === item.productId
                    )?.name || "N/A"}{" "}
                  </div>

                  <div className="mr-2">
                    {`$${item.price ? Number(item.price).toFixed(2) : "0.00"}`}
                  </div>
                </>
              )}
              renderAccordionContent={(item, index) => {
                return (
                  <SalesOrderLineForm
                    salesOrderId={id}
                    salesOrderLine={item}
                    salesOrderLineIndex={index}
                    removeSalesOrderLine={removeSalesOrderLine}
                    revalidateCache={revalidateCache}
                    saving={saving}
                    setValue={setValue}
                    watch={watch}
                  />
                );
              }}
              onAppend={() => {
                appendSalesOrderLine({
                  salesOrderId: salesOrder?.id,
                  productId: null,
                  quantity: 0,
                  price: null,
                });
              }}
              appendTitle="Add Sales Order Line"
              appendDisabled={saving}
            />
          </div>

          <Errors errors={savingErrors} />

          <FormActions
            id={id}
            onCancel={onCancel}
            onDeleteSuccess={onDeleteSuccess}
            onDeleteError={onDeleteError}
            request={id => api.entities.salesOrders.delete({ path: { id } })}
            saving={saving}
          />
        </Form>
      </FormProvider>
    </>
  );
}

export default SalesOrderForm;
