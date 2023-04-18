import Button from "@/components/Buttons/Button";
import Form from "@/components/ContentWrappers/Form";
import FormActions from "@/components/ContentWrappers/Form/FormActions";
import Errors from "@/components/Errors";
import Checkbox from "@/components/Inputs/Select/Checkbox";
import Label from "@/components/Label";
import { ROLES } from "@/constants/role";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

// Field definitions
export const PERMISSIONS_FORM_FIELDS = {
  ROLE: {
    ASP_NET_ROLE_ID: "id",
    ASP_NET_ROLE_NAME: "name",
  },
  CLAIM: {
    ID: "id",
    TYPE: "type",
    VALUE: "value",
    IS_CHECKED: "isChecked",
  },
};

// Form Validation
const formValidationSchema = Yup.object().shape({
  role: Yup.array().of(
    Yup.object().shape({
      [PERMISSIONS_FORM_FIELDS.ROLE.ASP_NET_ROLE_ID]: Yup.string().nullable(),
      [PERMISSIONS_FORM_FIELDS.ROLE.ASP_NET_ROLE_NAME]: Yup.string().nullable(),

      claim: Yup.array().of(
        Yup.object().shape({
          [PERMISSIONS_FORM_FIELDS.CLAIM.ID]: Yup.number().nullable(),
          [PERMISSIONS_FORM_FIELDS.CLAIM.TYPE]: Yup.string().nullable(),
          [PERMISSIONS_FORM_FIELDS.CLAIM.VALUE]: Yup.string().nullable(),
          [PERMISSIONS_FORM_FIELDS.CLAIM.IS_CHECKED]: Yup.boolean().nullable(),
        })
      ),
    })
  ),
});

type PermissionsFormPropTypes = {
  revalidateCache?: () => void;
};

type Claim = {
  id: number;
  type: string;
  value: string;
  isChecked: boolean;
};

type Role = {
  id: string;
  name: string;
  claims: Claim[];
};

function PermissionsForm({ revalidateCache }: PermissionsFormPropTypes) {
  const { data: session } = useSession();

  const defaultValues = {};
  const [isEditing, setIsEditing] = useState(false);

  const { data: permissions, loading: permissionsLoading } = useRequest(
    api.components.permissionsForm.get()
  );

  const {
    data: saveData,
    loading: saving,
    errors: savingErrors,
    submitRequest: savePermissions,
  } = useRequest(api.components.permissionsForm.update(), {
    onSuccess,
    onError,
  });

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues: permissions || defaultValues,
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

  const { fields: roles } = useFieldArray({
    name: "roles",
    control,
  });

  function onCancel() {
    reset(permissions || defaultValues);
    setIsEditing(false);
  }

  function onError(response: any) {
    toast.error("Failed to save changes.");
  }

  function onSubmit(values: any) {
    console.log(values);
    savePermissions(values);
  }

  function onSuccess(response: any) {
    revalidateCache?.();
    toast.success("Changes saved.");
    setIsEditing(false);
  }

  function onEdit() {
    setIsEditing(true);
  }

  // Once we get the permissions, set the form values
  useEffect(() => {
    if (!permissionsLoading && permissions) {
      reset(permissions);
    }
  }, [permissionsLoading]);

  if (permissionsLoading) {
    return null;
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-row justify-between items-center h-10">
            <Label variant="h4">Edit Permissions</Label>

            {!isEditing && (
              <Button size="sm" onClick={onEdit}>
                Edit
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
            {roles.map((role: Role, roleIndex) => (
              <div
                key={role.id}
                className={
                  !session?.user?.roles?.includes(ROLES.SUPER_ADMIN) &&
                  role.name === ROLES.SUPER_ADMIN
                    ? "hidden"
                    : ""
                }
              >
                <Label variant="h5" className="mb-1">
                  {role.name}
                </Label>

                {role.claims.map((claim: Claim, claimIndex) => (
                  <Checkbox
                    key={claim.id}
                    label={claim.value}
                    name={`roles.${roleIndex}.claims.${claimIndex}.${PERMISSIONS_FORM_FIELDS.CLAIM.IS_CHECKED}`}
                    disabled={!isEditing}
                  />
                ))}
              </div>
            ))}
          </div>

          <Errors errors={savingErrors} />

          {isEditing && (
            <FormActions
              //
              onCancel={onCancel}
              saving={saving}
            />
          )}
        </Form>
      </FormProvider>
    </>
  );
}

export default PermissionsForm;
