import Form from "@/components/ContentWrappers/Form";
import FormActions from "@/components/ContentWrappers/Form/FormActions";
import FormLabel from "@/components/ContentWrappers/Form/FormLabel";
import Errors from "@/components/Errors";
import TextField from "@/components/Inputs/Text/TextField";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

// Field definitions
export const PRODUCT_FORM_FIELDS = {
  NAME: "name",
  DESCRIPTION: "description",
  PRICE: "price",
};

// Form Validation
const formValidationSchema = Yup.object({
  [PRODUCT_FORM_FIELDS.NAME]: Yup.string().required(),
  [PRODUCT_FORM_FIELDS.DESCRIPTION]: Yup.string().nullable(),
  [PRODUCT_FORM_FIELDS.PRICE]: Yup.number().required(),
});

// Prop Typescript
type ProductFormProps = {
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

function ProductForm({
  activeObject: product,
  defaultValues: defaultValuesProp,
  id,
  loading = false,
  onCloseModal,
  onCancel: onCancelProp,
  onSuccess: onSuccessProp,
  revalidateCache,
  title,
}: ProductFormProps) {
  const router = useRouter();
  const defaultValues = defaultValuesProp || {};

  // API Calls
  const {
    data: saveData,
    loading: saving,
    errors: savingErrors,
    submitRequest: saveProduct,
  } = useRequest(api.entities.products.save({ path: { id } }), {
    onSuccess,
    onError,
  });

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues: product || defaultValues,
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

  function onCancel() {
    if (onCancelProp) {
      onCancelProp();
    } else {
      onCloseModal();
    }
  }

  function onError(response: any) {
    toast.error("Failed to save changes.");
  }

  function onSubmit(values: any) {
    saveProduct(values);
  }

  function onSuccess(response: any) {
    if (onSuccessProp) {
      onSuccessProp(response);
    } else {
      onCloseModal?.();
    }

    revalidateCache?.();
    toast.success("Changes saved.");
  }

  function onDeleteError(response: any) {
    toast.error("Failed to remove product.");
  }

  function onDeleteSuccess(response: any) {
    revalidateCache?.();
    onCloseModal?.();
    toast.success("Product removed.");
  }

  return (
    <div>
      <FormProvider {...formMethods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {!!title && <FormLabel id={id}>{title}</FormLabel>}

          <TextField
            label="Name"
            name={PRODUCT_FORM_FIELDS.NAME}
            maxLength={255}
          />

          <TextField
            label="Price"
            type="number"
            name={PRODUCT_FORM_FIELDS.PRICE}
            step="0.01"
            prepend="$"
          />

          <TextField
            label="Description"
            name={PRODUCT_FORM_FIELDS.DESCRIPTION}
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
            request={(id) => api.entities.products.delete({ path: { id } })}
            loading={loading}
            saving={saving}
          />
        </Form>
      </FormProvider>
    </div>
  );
}

export default ProductForm;
