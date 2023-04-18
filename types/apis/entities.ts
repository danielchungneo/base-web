import { IBaseCrudRoutes } from "../api";

export interface ICustomersApi extends IBaseCrudRoutes {
  //
}

export interface IProductsApi extends IBaseCrudRoutes {
  //
}

export interface ISalesOrdersApi extends IBaseCrudRoutes {
  //
}

export interface ISalesOrderLinesApi extends IBaseCrudRoutes {
  //
}

export interface ISalesOrderStatusesApi extends IBaseCrudRoutes {
  //
}

export interface ISalesOrderTypesApi extends IBaseCrudRoutes {
  //
}

/**
 * Entities API
 */
export interface IEntitiesApi {
  customers: ICustomersApi;
  products: IProductsApi;
  salesOrders: ISalesOrdersApi;
  salesOrderLines: ISalesOrderLinesApi;
  salesOrderStatuses: ISalesOrderStatusesApi;
  salesOrderTypes: ISalesOrderTypesApi;
}
