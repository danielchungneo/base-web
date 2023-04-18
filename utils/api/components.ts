import { HTTP_REQUEST_METHODS } from "@/constants/http";
import { IBuildUrlOptions } from "@/types";
import {
  IComponentsApi,
  IPermissionsFormApi,
  ISalesOrderFormApi,
} from "@/types/apis/components";

const permissionsForm: IPermissionsFormApi = {
  get: (options?: IBuildUrlOptions) => {
    return {
      url: "/view/components/permissionsForm",
      method: HTTP_REQUEST_METHODS.GET,
      options,
    };
  },
  update: (options?: IBuildUrlOptions) => {
    return {
      url: `/view/components/permissionsForm`,
      method: HTTP_REQUEST_METHODS.PUT,
      options,
    };
  },
};

const salesOrderForm: ISalesOrderFormApi = {
  save: (options?: IBuildUrlOptions) => {
    if (options?.path?.id === "create") {
      return {
        url: `/view/components/salesOrderForm`,
        method: HTTP_REQUEST_METHODS.POST,
        options,
      };
    }
    return {
      url: `/view/components/salesOrderForm/:id`,
      method: HTTP_REQUEST_METHODS.PUT,
      options,
    };
  },
};

const components: IComponentsApi = {
  permissionsForm,
  salesOrderForm,
};

export default components;
