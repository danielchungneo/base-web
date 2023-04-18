import { HTTP_REQUEST_METHODS } from "@/constants/http";
import { IAction, IUseRequestOptions } from "@/types";
import {
  buildUrl,
  createRequest,
  fetcherWithSession,
  formatSwrResponse,
} from "@/utils/http";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function useRequest(
  action: IAction,
  { onError, onSuccess, manuallyTrigger }: IUseRequestOptions = {}
) {
  const { data: session } = useSession();

  const shouldUseSWRMutation =
    action.method !== HTTP_REQUEST_METHODS.GET || manuallyTrigger;
  const swrKey = buildUrl(action.url, action.options);

  /**
   * useSWR: If the action is a GET request and manuallyTrigger = false
   */
  const {
    data: swrData,
    error: swrError,
    mutate,
    isLoading,
    isValidating,
  } = useSWR(!shouldUseSWRMutation ? swrKey : null, (url) =>
    fetcherWithSession(url, session)
  );

  const { data: swrDataToReturn, errors: swrErrors } = formatSwrResponse(
    swrData,
    swrError
  );

  /**
   * useSWRMutation: If the action is not a GET request or manuallyTrigger = true
   */
  async function mutationFetcher(url, { arg: body }) {
    return createRequest(action, body, session);
  }

  const onErrorHandler = (error) => {
    onError?.([error]);
  };

  const onSuccessHandler = ({ data, errors }) => {
    if (errors.length) {
      onError?.(errors);
    } else {
      onSuccess?.(data);
    }
  };

  const {
    data: swrMutationData,
    error: swrMutationError,
    trigger,
    isMutating,
    reset,
  } = useSWRMutation(shouldUseSWRMutation ? swrKey : null, mutationFetcher, {
    onError: onErrorHandler,
    onSuccess: onSuccessHandler,
  });

  const { data: swrMutationDataToReturn, errors: swrMutationErrors } =
    formatSwrResponse(swrMutationData, swrMutationError);

  return {
    data: shouldUseSWRMutation ? swrMutationDataToReturn : swrDataToReturn,
    errors: shouldUseSWRMutation ? swrMutationErrors : swrErrors,
    loading: shouldUseSWRMutation ? isMutating : isLoading || isValidating,
    isMutating,
    isValidating,
    resetRequest: reset,
    revalidateCache: mutate,
    submitRequest: trigger,
  };
}
