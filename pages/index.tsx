import Dashboard from "@/components/Dashboard";
import Page from "@/components/Page";

type HomeProps = {
  //
};

function Home(props: HomeProps) {
  return (
    <Page breadcrumbs={false} title="Dashboard">
      <Dashboard />
    </Page>
  );
}

export default Home;
