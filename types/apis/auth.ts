import { ApiActionSetup, IBaseCrudRoutes } from "../api";

export interface ISessionApi {
  get: ApiActionSetup;
  login: ApiActionSetup;
  logout: ApiActionSetup;
}

export interface IRolesApi {
  getAll: ApiActionSetup;
}

export interface IUsersApi extends IBaseCrudRoutes {
  resetPasswordRequest: ApiActionSetup;
  resetPassword: ApiActionSetup;
  register: ApiActionSetup;
}

/**
 * Auth API
 */

export interface IAuthApi {
  session: ISessionApi;
  roles: IRolesApi;
  users: IUsersApi;
}
