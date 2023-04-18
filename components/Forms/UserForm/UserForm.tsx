import Button from "@/components/Buttons/Button/Button";
import Form from "@/components/ContentWrappers/Form";
import FormActions from "@/components/ContentWrappers/Form/FormActions";
import Errors from "@/components/Errors";
import EntitySelect from "@/components/Inputs/Select/EntitySelect";
import TextField from "@/components/Inputs/Text/TextField";
import Label from "@/components/Label";
import { OPPERANDS } from "@/constants/api";
import { ROLES } from "@/constants/role";
import api from "@/utils/api";
import useAuthorization from "@/utils/hooks/useAuthorization";
import useRequest from "@/utils/hooks/useRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

// Field definitions
export const USER_FORM_FIELDS = {
  ROLE: "role",
  NAME: "name",
  EMAIL: "email",
  NEW_PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
};

// Form Validation
const formValidationSchema = Yup.object({
  [USER_FORM_FIELDS.ROLE]: Yup.string().required(),
  [USER_FORM_FIELDS.NAME]: Yup.string().required(),
  [USER_FORM_FIELDS.EMAIL]: Yup.string().email().required(),
  [USER_FORM_FIELDS.NEW_PASSWORD]: Yup.string().nullable(),
  [USER_FORM_FIELDS.CONFIRM_PASSWORD]: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

// Prop Typescript
type UserFormPropTypes = {
  user?: any;
  revalidateCache?: () => void;
  id: any;
  title: string;
  loading?: boolean;
  profilePage?: boolean;
};

function UserForm({
  user,
  revalidateCache,
  id,
  loading = false,
  title,
  profilePage,
}: UserFormPropTypes) {
  const router = useRouter();
  const defaultValues = {};
  const [isEditing, setIsEditing] = useState(!profilePage);
  const isSuperAdmin = useAuthorization({
    roles: {
      values: [ROLES.SUPER_ADMIN],
    },
  });

  // API Calls
  const {
    loading: saving,
    errors: savingErrors,
    submitRequest: saveUser,
  } = useRequest(api.auth.users.save({ path: { id } }), {
    onSuccess,
    onError,
  });

  const formMethods = useForm({
    resolver: yupResolver(formValidationSchema),
    defaultValues: user || defaultValues,
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
    if (profilePage) {
      reset();
      setIsEditing(false);
    } else {
      router.back();
    }
  }

  function onError(response: any) {
    toast.error("Failed to save changes.");
  }

  function onSubmit(values: any) {
    values.userName = values.email;
    values.roles = [values.role];
    saveUser(values);
  }

  function onSuccess(response: any) {
    if (profilePage) {
      revalidateCache?.();
      setIsEditing(false);
    } else {
      router.push(`/users/`);
    }
    toast.success("Changes saved.");
  }

  function onEdit() {
    setIsEditing(true);
  }

  // Once we get the user, set the form values
  useEffect(() => {
    if (user?.id) {
      reset({ ...user, role: user.roles[0] });
    }
  }, [user]);

  return (
    <>
      <FormProvider {...formMethods}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 mx-auto"
        >
          <div className="flex flex-row justify-between items-center h-10">
            <Label variant="h4">{`${
              id === "create" ? "Create" : "Edit"
            } ${title}`}</Label>

            {!isEditing && profilePage && (
              <Button size="sm" onClick={onEdit}>
                Edit
              </Button>
            )}
          </div>

          <EntitySelect
            label="Role"
            name={USER_FORM_FIELDS.ROLE}
            disabled={profilePage || !isEditing}
            valueField="name"
            labelField="name"
            request={api.auth.roles.getAll({
              query: {
                filter: [
                  !isSuperAdmin && {
                    field: "name",
                    value: ROLES.SUPER_ADMIN,
                    opperand: OPPERANDS.NOT_EQUALS,
                  },
                ],
              },
            })}
          />

          <TextField
            label="Name"
            name={USER_FORM_FIELDS.NAME}
            disabled={!isEditing}
          />

          <TextField
            label="Email"
            name={USER_FORM_FIELDS.EMAIL}
            disabled={!isEditing}
          />

          {id === "create" && (
            <React.Fragment>
              <TextField
                label="New Password"
                type="password"
                name={USER_FORM_FIELDS.NEW_PASSWORD}
                maxLength={255}
                disabled={!isEditing}
              />

              <TextField
                label="Confirm Password"
                type="password"
                name={USER_FORM_FIELDS.CONFIRM_PASSWORD}
                maxLength={255}
                disabled={!isEditing}
              />
            </React.Fragment>
          )}

          <Errors errors={savingErrors} />

          {isEditing && <FormActions onCancel={onCancel} saving={saving} />}
        </Form>
      </FormProvider>
    </>
  );
}

export default UserForm;
