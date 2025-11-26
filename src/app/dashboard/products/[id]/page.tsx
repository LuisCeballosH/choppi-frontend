import PageHeader from "@/components/PageHeader";
import ProductForm from "@/components/products/ProductForm";
import { getProduct } from "@/services/product.service";
import { getStores } from "@/services/store.service";

export default async function EditProduct({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const product = await getProduct(id);
  const stores = await getStores();
  return (
    <>
      <PageHeader
        title="Edit Product"
        breadcrumbItems={[
          { label: "Dashboard", link: "/dashboard" },
          { label: "Products", link: "/dashboard/products" },
          { label: "Edit Product" },
        ]}
      />
      <ProductForm product={product} stores={stores.stores} />
    </>
  );
}
