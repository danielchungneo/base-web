import DeleteButton from "@/components/DeleteButton";
import Errors from "@/components/Errors";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import TextField from "@/components/Inputs/Text/TextField";
import Label from "@/components/Label";
import Form from "@/components/ContentWrappers/Form";
import Button from "@/components/Buttons/Button";
import FormActions from "@/components/ContentWrappers/Form/FormActions";
import FormLabel from "@/components/ContentWrappers/Form/FormLabel";

// Field definitions
export const SALES_ORDER_STATUS_FORM_FIELDS = {
  NAME: "name",
  DESCRIPTION: "description",
};

// Form Validation
const formValidationSchema = Yup.object({
  [SALES_ORDER_STATUS_FORM_FIELDS.NAME]: Yup.string().required(),
  [SALES_ORDER_STATUS_FORM_FIELDS.DESCRIPTION]: Yup.string().nullable(),
});

// Prop Definitions
type SalesOrderStatusFormProps = {
  activeObject?: any;
  defaultValues?: any;
  id: string | string[];
  loading?: boolean;
  onCancel?: () => void;
  onCloseModal: () => void;
  onSuccess?: (values) => void;
  revalidateCache?: () => void;
  title: string;
};

function SalesOrderStatusForm ({
  activeObject: salesOrderStatus,
  defaultValues: defaultValuesProp,
  id,
  loading = false,
  onCloseModal,
  onCancel: onCancelProp,
  onSuccess: onSuccessProp,
  revalidateCache,
  title,
}: SalesOrderStatusFormProps) {
  const router = useRouter();
  const defaultValues = defaultValuesProp || {};

  // API Calls
  const {
    data: saveData,
    loading: saving,
    errors: savingErrors,
    submitRequest: saveSalesOrderStatus,
  } = useRequest(api.entities.salesOrderStatuses.save({ path: { id } }), {
    onSuccess,
    onError,
  });

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues: salesOrderStatus || defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
    watch,
    setValue,
    getValues,
    control,
  } = formMethods;

  function onCancel () {
    if (onCancelProp) {
      onCancelProp();
    } else {
      onCloseModal();
    }
  }

  function onError (response: any) {
    toast.error("Failed to save changes.");
  }

  function onSubmit (values: any) {
    saveSalesOrderStatus(values);
  }

  function onSuccess (response: any) {
    if (onSuccessProp) {
      onSuccessProp(response);
    } else {
      onCloseModal?.();
    }

    revalidateCache?.();
    toast.success("Changes saved.");
  }

  function onDeleteError (response: any) {
    toast.error("Failed to remove sales order status.");
  }

  function onDeleteSuccess (response: any) {
    revalidateCache?.();
    onCloseModal?.();
    toast.success("Sales order status removed.");
  }

  return (
    <div>
      <FormProvider {...formMethods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {!!title && <FormLabel id={id}>{title}</FormLabel>}

          <TextField
            label="Name"
            name={SALES_ORDER_STATUS_FORM_FIELDS.NAME}
            maxLength={255}
          />

          <TextField
            label="Description"
            name={SALES_ORDER_STATUS_FORM_FIELDS.DESCRIPTION}
            maxLength={255}
            as="textarea"
            style={{ height: "100px" }}
          />

          <Errors errors={savingErrors} />

          <FormActions
            id={id}
            onCancel={onCancel}
            onDeleteSuccess={onDeleteSuccess}
            onDeleteError={onDeleteError}
            request={id =>
              api.entities.salesOrderStatuses.delete({ path: { id } })
            }
            saving={saving}
            loading={loading}
          />
        </Form>
      </FormProvider>
    </div>
  );
}

export default SalesOrderStatusForm;
