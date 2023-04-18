import DeleteButton from "@/components/DeleteButton";
import Errors from "@/components/Errors";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Label from "@/components/Label";
import TextField from "@/components/Inputs/Text/TextField";
import Button from "@/components/Buttons/Button/Button";
import Form from "@/components/ContentWrappers/Form";
import FormActions from "@/components/ContentWrappers/Form/FormActions";
import FormLabel from "@/components/ContentWrappers/Form/FormLabel";

// Field definitions
export const CUSTOMER_FORM_FIELDS = {
  NAME: "name",
  DESCRIPTION: "description",
};

// Form Validation
const formValidationSchema = Yup.object({
  [CUSTOMER_FORM_FIELDS.NAME]: Yup.string().required(),
  [CUSTOMER_FORM_FIELDS.DESCRIPTION]: Yup.string().nullable(),
});

// Prop Typescript
type CustomerFormProps = {
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

function CustomerForm ({
  activeObject: customer,
  defaultValues: defaultValuesProp,
  id,
  loading = false,
  onCloseModal,
  onCancel: onCancelProp,
  onSuccess: onSuccessProp,
  revalidateCache,
  title,
}: CustomerFormProps) {
  const router = useRouter();
  const defaultValues = defaultValuesProp || {};

  // API Calls
  const {
    data: saveData,
    loading: saving,
    errors: savingErrors,
    submitRequest: saveCustomer,
  } = useRequest(api.entities.customers.save({ path: { id } }), {
    onSuccess,
    onError,
  });

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues: customer || defaultValues,
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
    saveCustomer(values);
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
    toast.error("Failed to remove customer.");
  }

  function onDeleteSuccess (response: any) {
    revalidateCache?.();
    onCloseModal?.();
    toast.success("Customer removed.");
  }

  return (
    <div>
      <FormProvider {...formMethods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {!!title && <FormLabel id={id}>{title}</FormLabel>}

          <FormLabel>{title}</FormLabel>

          <TextField
            label="Name"
            name={CUSTOMER_FORM_FIELDS.NAME}
            maxLength={255}
          />

          <TextField
            label="Description"
            name={CUSTOMER_FORM_FIELDS.DESCRIPTION}
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
            request={id => api.entities.customers.delete({ path: { id } })}
            loading={loading}
            saving={saving}
          />
        </Form>
      </FormProvider>
    </div>
  );
}

export default CustomerForm;
