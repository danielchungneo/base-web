import DeleteButton from "@/components/DeleteButton";
import Errors from "@/components/Errors";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import useUnsavedValues from "@/utils/hooks/useUnsavedValues";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Form from "@/components/ContentWrappers/Form";
import FormLabel from "@components/ContentWrappers/Form/FormLabel";

export const {{upperSnakeCaseSingular entityName}}_FORM_FIELDS = {
  NAME: "name",
  DESCRIPTION: "description",
};

const formValidationSchema = Yup.object({
  [{{upperSnakeCaseSingular entityName}}_FORM_FIELDS.NAME]: Yup.string().required(),
  [{{upperSnakeCaseSingular entityName}}_FORM_FIELDS.DESCRIPTION]: Yup.string().nullable(),
});

type {{entityName}}FormProps = {
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

function {{entityName}}Form({
  activeObject: {{camelCaseSingular entityName}},
  defaultValues: defaultValuesProp,
  id,
  loading = false,
  onCloseModal,
  onCancel: onCancelProp,
  onSuccess: onSuccessProp,
  revalidateCache,
  title,
}: {{entityName}}FormProps) {
  const router = useRouter();
  const defaultValues = defaultValuesProp || {};

  const {
    loading: saving,
    errors,
    submitRequest: save{{entityName}},
  } = useRequest(api.entities.{{camelCasePlural entityName}}.save({ path: { id } }), {
    onSuccess,
    onError,
  });

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues,
  });

  const { handleSubmit } = formMethods;

  const {
    isDirty,
    onCancelUnsavedValues,
    onErrorUnsavedValues,
    onSuccessUnsavedValues,
    restoreUnsavedForm,
  } = useUnsavedValues(`{{entityName}}Form/${id}`, formMethods);

  const onCancel = useCallback(() => {
    if (onCancelProp) {
      onCancelProp();
    } else {
      onCloseModal();
    }

    onCancelUnsavedValues();
  }, []);

  function onError(response: any) {
    onErrorUnsavedValues();
    toast.error("Failed to save changes.");
  }

  function onSubmit(values: any) {
    save{{entityName}}(values);
  }

  function onSuccess(response: any) {
    if (onSuccessProp) {
      onSuccessProp(response);
    } else {
      onCloseModal?.();
    }

    revalidateCache?.();
    onSuccessUnsavedValues();
    toast.success("Changes saved.");
  }

  const onDeleteError = useCallback(() => {
    toast.error("Failed to remove {{startCaseSingular entityName}}.");
  }, []);

  const onDeleteSuccess = useCallback(() => {
    revalidateCache?.();
    onCloseModal?.();
    toast.success("{{startCaseSingular entityName}} removed.");
  }, []);

  useEffect(() => {
    restoreUnsavedForm({{camelCaseSingular entityName}});
  }, []);

  return (
    <>
      <FormProvider {...formMethods}>
        <Form>
        <div className="col-span-3 flex flex-row justify-between">
          {!!title && <FormLabel id={id}>{title}</FormLabel>}

            {isDirty && <p className="text-danger">Unsaved changes.</p>}
          </div>

         <TextField
            label="Name"
            name={SALES_ORDER_TYPE_FORM_FIELDS.NAME}
            maxLength={255}
          />

          <TextField
            label="Description"
            name={SALES_ORDER_TYPE_FORM_FIELDS.DESCRIPTION}
            maxLength={255}
            as="textarea"
            style={{ height: "100px" }}
          />

          <Errors errors={errors} />

          <div className="flex flex-row pt-4">
            {id !== "create" && (
              <DeleteButton
                id={id}
                disabled={loading || saving}
                request={id =>
                  api.entities.{{camelCasePlural entityName}}.delete({ path: { id } })
                }
                onSuccess={onDeleteSuccess}
                onError={onDeleteError}
              />
            )}

            <Button
              variant="neutral"
              disabled={loading || saving}
              className="mr-1 text-dark flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>

            <Button
              disabled={loading || saving}
              className="ml-1 flex-1"
              type="submit"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}

export default {{entityName}}Form;
