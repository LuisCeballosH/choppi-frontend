import PageHeader from "@/components/PageHeader";
import ProductForm from "@/components/products/ProductForm";
import { getStores } from "@/services/store.service";

export default async function CreateStore() {
  const stores = await getStores();
  return (
    <>
      <PageHeader
        title="Create Product"
        breadcrumbItems={[
          { label: "Dashboard", link: "/dashboard" },
          { label: "Products", link: "/dashboard/products" },
          { label: "Create Product" },
        ]}
      />
      <ProductForm stores={stores.stores} />
    </>
  );
}
