import Card from "@/components/ContentWrappers/Card";
import SalesOrderTypeList from "@/components/Demo/Lists/SalesOrderTypeList";
import Page from "@/components/Page";

type SalesOrderTypePageProps = {
  //
};

function SalesOrderTypePage(props: SalesOrderTypePageProps) {
  return (
    <Page title="Sales Order Types">
      <Card className="flex-1">
        <SalesOrderTypeList />
      </Card>
    </Page>
  );
}

export default SalesOrderTypePage;
