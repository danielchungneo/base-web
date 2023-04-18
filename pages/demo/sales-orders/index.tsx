import Card from "@/components/ContentWrappers/Card";
import SalesOrderList from "@/components/Demo/Lists/SalesOrderList";
import Page from "@/components/Page";

type SalesOrdersPageProps = {
  //
};

function SalesOrderPage(props: SalesOrdersPageProps) {
  return (
    <Page title="Sales Orders">
      <Card className="flex-1">
        <SalesOrderList />
      </Card>
    </Page>
  );
}

export default SalesOrderPage;
