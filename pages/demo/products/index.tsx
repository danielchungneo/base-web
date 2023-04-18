import Card from "@/components/ContentWrappers/Card";
import ProductList from "@/components/Demo/Lists/ProductList";
import Page from "@/components/Page";

type ProductPageProps = {
  //
};

function ProductPage(props: ProductPageProps) {
  return (
    <Page title="Products">
      <Card className="flex-1">
        <ProductList />
      </Card>
    </Page>
  );
}

export default ProductPage;
