import { getSessionToken } from "@/utils/http";
import { useSWRConfig } from "swr";

export default function useRevalidateCache(url = ``) {
  const token = getSessionToken();
  const key = token ? [url, token] : url;
  const { mutate } = useSWRConfig();
  const revalidateCache = () => mutate(key);

  return revalidateCache;
}
