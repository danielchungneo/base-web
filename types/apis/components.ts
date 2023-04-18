import { ApiActionSetup } from "../api";

export interface IPermissionsFormApi {
  get: ApiActionSetup;
  update: ApiActionSetup;
}

export interface ISalesOrderFormApi {
  save: ApiActionSetup;
}

/**
 * Components API
 */
export interface IComponentsApi {
  permissionsForm: IPermissionsFormApi;
  salesOrderForm: ISalesOrderFormApi;
}
