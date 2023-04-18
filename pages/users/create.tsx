import Card from "@/components/ContentWrappers/Card";
import UsersForm from "@/components/Forms/UserForm";
import Page from "@/components/Page";

type CreateUserFormProps = {
  //
};

function CreateUserForm(props: CreateUserFormProps) {
  return (
    <Page title="Create User">
      <Card>
        <UsersForm id="create" title="User" />
      </Card>
    </Page>
  );
}

export default CreateUserForm;
