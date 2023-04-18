import PasswordResetRequestForm from "@/components/Forms/Auth/PasswordResetRequestForm";
import Page from "@/components/Page";

type ResetPasswordRequestPageProps = {
  //
};

function ResetPasswordRequestPage(props: ResetPasswordRequestPageProps) {
  return (
    <Page
      fullWidth
      isPublic
      breadcrumbs={false}
      footer={false}
      header={false}
      sidebar={false}
      title="Forgot Password"
    >
      <div className="auth-page-container">
        <div className="flex-1 flex flex-col items-center justify-center md:items-start md:pt-20 md:pl-20">
          <PasswordResetRequestForm title="Forgot your password?" />
        </div>
      </div>
    </Page>
  );
}

export default ResetPasswordRequestPage;
