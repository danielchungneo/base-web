import Page from "@/components/Page";
import LoginForm from "../../components/Forms/Auth/LoginForm";

export interface ILogin {
  //
}

export default function Login(props: ILogin) {
  return (
    <Page
      isPublic
      breadcrumbs={false}
      header={false}
      footer={false}
      fullWidth
      sidebar={false}
      title="Login"
    >
      <div className="auth-page-container">
        <div className="flex-1 flex flex-col items-center justify-start md:justify-center md:items-start md:pt-20 md:pl-20">
          <LoginForm />
        </div>
      </div>
    </Page>
  );
}
