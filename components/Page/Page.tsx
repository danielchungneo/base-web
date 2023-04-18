import { ENV } from "@/constants/config";
import useAuthorization, {
  IAuthorizationOptions,
} from "@/utils/hooks/useAuthorization";
import { capitalize } from "lodash";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../Layout";
import LoadingPage from "../Loaders/LoadingPage";
import Unauthorized from "../Unauthorized";

type PageProps = {
  authorization?: IAuthorizationOptions;
  breadcrumbs?: boolean;
  children?: any;
  className?: string;
  footer?: boolean;
  fullWidth?: boolean;
  header?: boolean;
  isPublic?: boolean;
  sidebar?: boolean;
  title: string;
};

function Page({
  authorization,
  children,
  className = "",
  breadcrumbs = true,
  isPublic = false,
  header = false,
  footer = true,
  fullWidth = false,
  sidebar = true,
  title,
}: PageProps) {
  const titleWithEnvironment =
    ENV === "production"
      ? `${title} - MC Web`
      : `(${capitalize(ENV)}) ${title} - MC Web`;

  const { data: session, status } = useSession({
    required: !isPublic,
  });

  const isLoading =
    (status === "loading" || status === "unauthenticated" || !session.user) &&
    !isPublic;

  const authorized = useAuthorization(authorization);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Head>
        <title>{titleWithEnvironment}</title>
      </Head>
      <Layout
        breadcrumbs={breadcrumbs}
        className={className}
        header={header}
        footer={footer}
        fullWidth={fullWidth}
        sidebar={sidebar}
      >
        {authorized ? children : <Unauthorized />}
      </Layout>
    </>
  );
}

export default Page;
