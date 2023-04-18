import RegisterForm from "@/components/Forms/Auth/RegisterForm";
import Page from "@/components/Page";

export interface IRegister {
  //
}

export default function Register(props: IRegister) {
  return (
    <Page
      fullWidth
      isPublic
      breadcrumbs={false}
      footer={false}
      header={false}
      sidebar={false}
      title="Register"
    >
      <div className="auth-page-container">
        <div className="flex-1 flex flex-col items-center justify-center md:items-start md:pt-20 md:pl-20">
          <RegisterForm />
        </div>
      </div>
    </Page>
  );
}
