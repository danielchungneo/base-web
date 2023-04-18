import { IApi } from "@/types";
import auth from "./auth";
import components from "./components";
import entities from "./entities";
import services from "./services";

const api: IApi = {
  auth,
  components,
  entities,
  services,
};

export default api;
