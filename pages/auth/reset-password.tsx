import PasswordResetForm from "@/components/Forms/Auth/PasswordResetForm";
import Page from "@/components/Page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type ResetPasswordPageProps = {
  //
};

function ResetPasswordPage(props: ResetPasswordPageProps) {
  const { data: session } = useSession();
  const {
    query: { email, token },
  } = useRouter();

  return (
    <Page
      fullWidth
      isPublic
      breadcrumbs={false}
      header={false}
      footer={false}
      sidebar={false}
      title="Reset Password"
    >
      <div className="auth-page-container">
        <div className="flex-1 flex flex-col items-center justify-center md:items-start md:pt-20 md:pl-20">
          <PasswordResetForm
            id={session?.user?.id}
            email={email}
            token={token as string}
            user={session?.user}
            title="Enter Your New Password"
            fullScreen
          />
        </div>
      </div>
    </Page>
  );
}

export default ResetPasswordPage;
