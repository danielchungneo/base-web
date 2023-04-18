import Card from "@/components/ContentWrappers/Card";
import PasswordResetForm from "@/components/Forms/Auth/PasswordResetForm";
import UserForm from "@/components/Forms/UserForm";
import Page from "@/components/Page";
import { useSession } from "next-auth/react";

type ProfilePageProps = {
  //
};

function ProfilePage(props: ProfilePageProps) {
  const { data: session } = useSession();

  return (
    <Page className="lg:max-w-3xl" title="Profile">
      <Card>
        <UserForm
          profilePage
          id={session?.user?.id}
          user={session?.user}
          title="Profile"
        />
      </Card>

      <div className="mt-4" />

      <Card>
        <PasswordResetForm
          user={session?.user}
          id={session?.user?.id}
          title="Reset Your Password"
        />
      </Card>
    </Page>
  );
}

export default ProfilePage;
