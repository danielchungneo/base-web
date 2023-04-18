import useAuthorization, {
  IAuthorizationOptions,
} from "@/utils/hooks/useAuthorization";

type AuthorizationProps = {
  authorization?: IAuthorizationOptions;
  children: any;
};

function Authorization({ authorization, children }: AuthorizationProps) {
  const authorized = useAuthorization(authorization);

  if (!authorized) {
    return null;
  }

  return children;
}

export default Authorization;
