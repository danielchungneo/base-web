import Card from "@/components/ContentWrappers/Card";
import UsersList from "@/components/Lists/UsersList";
import Page from "@/components/Page";
import { PERMISSIONS } from "@/constants/permission";

type UsersProps = {
  //
};

function Users(props: UsersProps) {
  return (
    <Page
      authorization={{
        permissions: {
          values: [PERMISSIONS.MANAGE_USERS],
        },
      }}
      title="Users"
    >
      <Card>
        <UsersList />
      </Card>
    </Page>
  );
}

export default Users;
