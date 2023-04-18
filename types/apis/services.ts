import { ApiActionSetup } from "../api";

export interface IDemoServiceApi {
  doSomething: ApiActionSetup;
}

/**
 * Services API
 */

export interface IServicesApi {
  demoService: IDemoServiceApi;
}
