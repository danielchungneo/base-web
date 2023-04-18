import { IAuthApi } from "./apis/auth";
import { IComponentsApi } from "./apis/components";
import { IEntitiesApi } from "./apis/entities";
import { IServicesApi } from "./apis/services";
import { GenericObject } from "./data";

export type ApiActionSetup = (options?: IBuildUrlOptions) => IAction;

export interface IBaseCrudRoutes {
  getAll: ApiActionSetup;
  get: ApiActionSetup;
  save: ApiActionSetup;
  delete: ApiActionSetup;
}

export interface IApi {
  auth: IAuthApi;
  components: IComponentsApi;
  entities: IEntitiesApi;
  services: IServicesApi;
}

export interface IApiData {
  [key: string]: any;
}

export interface IApiError {
  code?: number;
  message?: string;
}

export interface IApiResponse {
  data: IApiData | IApiData[];
  errors: IApiError[];
}

export interface IBuildUrlOptions {
  path?: GenericObject;
  query?: GenericObject;
}

export interface IAction {
  method: string;
  options?: IBuildUrlOptions;
  url: string;
  headers?: GenericObject;
}

export interface IUseRequestOptions {
  onError?: (errors: any) => void;
  onSuccess?: (data: any) => void;
  manuallyTrigger?: boolean;
}
