import Card from "@/components/ContentWrappers/Card";
import SalesOrderForm from "@/components/Demo/Forms/SalesOrderForm";
import Page from "@/components/Page";
import { useRouter } from "next/router";

type SalesOrderPageProps = {
  //
};

function SalesOrderPage(props: SalesOrderPageProps) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Page title="Sales Order">
      <Card>
        <SalesOrderForm id={id} title="Sales Order" />
      </Card>
    </Page>
  );
}

export default SalesOrderPage;
