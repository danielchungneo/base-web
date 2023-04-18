import {{entityName}}List from "@/components/Lists/{{entityName}}List";
import Page from "@/components/Page";
import Card from "@/components/ContentWrappers/Card";


type {{entityName}}PageProps = {
  //
};

function {{entityName}}Page(props: {{entityName}}PageProps) {
  return (
    <Page>
        <Card className='flex-1'>
          <{{entityName}}List />
        </Card>
    </Page>
  );
}

export default {{entityName}}Page;
