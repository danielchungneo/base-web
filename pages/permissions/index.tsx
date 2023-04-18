import Card from "@/components/ContentWrappers/Card";
import PermissionsForm from "@/components/Forms/PermissionsForm";
import Page from "@/components/Page";
import { PERMISSIONS } from "@/constants/permission";

type PermissionsPageProps = {
  //
};

function PermissionsPage(props: PermissionsPageProps) {
  return (
    <Page
      authorization={{
        permissions: {
          values: [PERMISSIONS.MANAGE_PERMISSIONS],
        },
      }}
      fullWidth={false}
      title="Permissions"
    >
      <Card>
        <PermissionsForm />
      </Card>
    </Page>
  );
}

export default PermissionsPage;
