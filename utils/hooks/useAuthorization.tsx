import { useSession } from "next-auth/react";

export interface IAuthorizationOptions {
  permissions?: {
    values: string[];
    required?: "all" | "any";
  };
  roles?: {
    values: string[];
    required?: "all" | "any";
  };
  required?: "all" | "any";
}

const defaultOptions: IAuthorizationOptions = {
  permissions: {
    values: [],
    required: "all",
  },
  roles: {
    values: [],
    required: "all",
  },
  required: "all",
};

export default function useAuthorization(options: IAuthorizationOptions) {
  const { data: session } = useSession();
  const {
    permissions: {
      values: permissionValues = defaultOptions.permissions.values,
      required: permissionsRequired = defaultOptions.permissions.required,
    },
    roles: {
      values: roleValues = defaultOptions.roles.values,
      required: rolesRequired = defaultOptions.roles.required,
    },
    required = defaultOptions.required,
  } = { ...defaultOptions, ...options };

  let permissionsAuthorized = true;
  let rolesAuthorized = true;

  if (permissionValues?.length > 0) {
    if (permissionsRequired === "all") {
      permissionsAuthorized = permissionValues.every((permission) =>
        session?.user?.claims?.includes(permission)
      );
    } else {
      permissionsAuthorized = permissionValues.some((permission) =>
        session?.user?.claims?.includes(permission)
      );
    }
  }

  if (roleValues?.length > 0) {
    if (rolesRequired === "all") {
      rolesAuthorized = roleValues.every((role) =>
        session?.user?.roles?.includes(role)
      );
    } else {
      rolesAuthorized = roleValues.some((role) =>
        session?.user?.roles?.includes(role)
      );
    }
  }

  if (required === "all") {
    return permissionsAuthorized && rolesAuthorized;
  }

  return permissionsAuthorized || rolesAuthorized;
}
