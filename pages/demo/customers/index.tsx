import Card from "@/components/ContentWrappers/Card";
import CustomerList from "@/components/Demo/Lists/CustomerList";
import Page from "@/components/Page";

type CustomerPageProps = {
  //
};

function CustomerPage(props: CustomerPageProps) {
  return (
    <Page title="Customers">
      <Card className="flex-1">
        <CustomerList />
      </Card>
    </Page>
  );
}

export default CustomerPage;
