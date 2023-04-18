import { API_HOST, SESSION_TOKEN } from "@/constants/config";
import { HTTP_REQUEST_METHODS } from "@/constants/http";
import { IAction, IBuildUrlOptions } from "@/constants/types";
import { GenericObject, IBaseCrudRoutes } from "@/types";

export const fetcherWithSession = async (url: string, session: any) =>
  fetch(url, {
    method: HTTP_REQUEST_METHODS.GET,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.accessToken}`,
      "X-CSRF-Token": session.user.csrfToken,
    },
    mode: "cors",
  }).then((res: any) => res.json());

export const fetcher = (...args: any[]) =>
  // @ts-ignore
  fetch(...args).then((res: any) => res.json());

export const removeSessionToken = () => {
  return typeof window !== "undefined"
    ? window.localStorage.removeItem(SESSION_TOKEN)
    : null;
};

export const getHeaders = (optionalHeaders: any = {}, session: any = null) => {
  const defaultHeaders: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (session) {
    if (session.user.accessToken) {
      defaultHeaders.Authorization = `Bearer ${session.user.accessToken}`;
    }

    if (session.user.csrfToken) {
      defaultHeaders["X-CSRF-Token"] = session.user.csrfToken;
    }
  }

  const headers: Headers = new Headers();
  const tempHeaders = Object.assign({}, defaultHeaders, optionalHeaders);

  Object.keys(tempHeaders).forEach((headerKey) => {
    headers.append(headerKey, tempHeaders[headerKey]);
  });

  return headers;
};

export const buildUrl = (url: string, options?: IBuildUrlOptions) => {
  return `${API_HOST}${formatUrlParams(url, options?.path)}${
    options?.query ? formatQueryParams(options?.query) : ""
  }`;
};

export const formatUrlParams = (url: string, variables: any = {}): string => {
  return url
    .split("/")
    .map((section: string) =>
      section[0] === ":" ? variables[section.slice(1)] : section
    )
    .join("/");
};

export const flattenOptions = (options: any) => {
  if (!options) return [];

  let args: any[] = [];

  Object.keys(options).forEach((key: string) => {
    const option = options[key];
    if (option instanceof Array && ["filter", "sort"].includes(key)) {
      option.forEach((k: any) => {
        args = args.concat(
          flattenOptions(k).map((opt) => ({
            [`${key}.${Object.keys(opt)[0]}`]: Object.values(opt)[0],
          }))
        );
      });
    } else if (option instanceof Array) {
      option.forEach((o: any) => {
        args.push({ [key]: o });
      });
    } else {
      args.push({ [key]: option });
    }
  });
  return args;
};

export const objectToEqualsString = (obj: GenericObject) =>
  `${Object.keys(obj)[0]}=${Object.values(obj)[0]}`;

export function formatQueryParams(options: any) {
  try {
    const flattenedOptions = flattenOptions(options);

    if (flattenedOptions && flattenedOptions.length) {
      return `?${flattenedOptions
        .map((option) => objectToEqualsString(option))
        .join("&")}`;
    }
    return "";
  } catch (e) {
    console.log("formatFilterAndSortOptions errors", e);
    return "";
  }
}

export async function createRequest(
  action: IAction,
  body?: GenericObject,
  session?: any
) {
  const requestOptions = {
    method: action.method,
    headers: getHeaders(action.headers, session),
    mode: "cors",
  } as any;

  // if the body is formData, we don't want to stringify it
  if (body) {
    requestOptions.body =
      body instanceof FormData ? body : JSON.stringify(body);
  }

  // if the body is formData, we don't want to use the default headers
  if (body instanceof FormData) {
    requestOptions.headers.delete("Accept");
    requestOptions.headers.delete("Content-Type");
  }

  let request;
  let response;
  try {
    request = await fetch(buildUrl(action.url, action.options), requestOptions);

    response = await request.json();

    if (!("data" in response)) {
      if ([400, 401, 403, 404, 500].includes(response.status)) {
        response = {
          data: null,
          errors: [{ code: response.status, message: response.title }],
        };
      } else {
        response = { data: response, errors: [] };
      }
    }
  } catch (e) {
    response = {
      data: null,
      errors: [{ code: request?.status, message: request?.statusText }],
    };
  }

  return response;
}

export function generateCrudRoutes(entity: string): IBaseCrudRoutes {
  return {
    getAll: (options?: IBuildUrlOptions) => {
      return {
        url: `/${entity}`,
        method: HTTP_REQUEST_METHODS.GET,
        options,
      };
    },
    get: (options?: IBuildUrlOptions) => {
      return {
        url: `/${entity}/:id`,
        method: HTTP_REQUEST_METHODS.GET,
        options,
      };
    },
    save: (options?: IBuildUrlOptions) => {
      if (options?.path?.id === "create") {
        return {
          url: `/${entity}`,
          method: HTTP_REQUEST_METHODS.POST,
        };
      }
      return {
        url: `/${entity}/:id`,
        method: HTTP_REQUEST_METHODS.PUT,
        options,
      };
    },
    delete: (options?: IBuildUrlOptions) => {
      return {
        url: `/${entity}/:id`,
        method: HTTP_REQUEST_METHODS.DELETE,
        options,
      };
    },
  };
}

export function formatSwrResponse(data, error) {
  let dataToReturn = data;
  let errorsToReturn = error ? [error] : [];

  if (data && "data" in data) {
    dataToReturn = data.data;
  }

  if (data && "errors" in data) {
    errorsToReturn = errorsToReturn.concat(data.errors);
  }

  return { data: dataToReturn, errors: errorsToReturn };
}
