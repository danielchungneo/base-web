import Card from "@/components/ContentWrappers/Card";
import UsersForm from "@/components/Forms/UserForm";
import Page from "@/components/Page";
import { PERMISSIONS } from "@/constants/permission";
import api from "@/utils/api";
import useRequest from "@/utils/hooks/useRequest";
import { useRouter } from "next/router";

type EditUserFormProps = {
  //
};

function EditUserForm(props: EditUserFormProps) {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: user,
    loading,
    errors,
    revalidateCache,
  } = useRequest(api.auth.users.get({ path: { id } }));

  return (
    <Page
      authorization={{
        permissions: {
          values: [PERMISSIONS.MANAGE_USERS],
        },
      }}
      className="lg:max-w-3xl"
      title="Edit User"
    >
      <Card className="self-start">
        {user && (
          <UsersForm
            id={id}
            user={user}
            loading={loading}
            revalidateCache={revalidateCache}
            title="User"
          />
        )}
      </Card>
    </Page>
  );
}

export default EditUserForm;
