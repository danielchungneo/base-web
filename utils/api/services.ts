import { HTTP_REQUEST_METHODS } from "@/constants/http";
import { IBuildUrlOptions } from "@/types";
import { IDemoServiceApi, IServicesApi } from "@/types/apis/services";

const demoService: IDemoServiceApi = {
  doSomething: (options?: IBuildUrlOptions) => {
    return {
      url: "/service/demoService/doSomething/:id",
      method: HTTP_REQUEST_METHODS.PUT,
      options,
    };
  },
};

const services: IServicesApi = {
  demoService,
};

export default services;
