import Card from "@/components/ContentWrappers/Card";
import SalesOrderStatusList from "@/components/Demo/Lists/SalesOrderStatusList";
import Page from "@/components/Page";

type SalesOrderStatusPageProps = {
  //
};

function SalesOrderStatusPage(props: SalesOrderStatusPageProps) {
  return (
    <Page title="Sales Order Statuses">
      <Card className="flex-1">
        <SalesOrderStatusList />
      </Card>
    </Page>
  );
}

export default SalesOrderStatusPage;
