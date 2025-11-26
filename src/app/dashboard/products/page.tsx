import PageHeader from "@/components/PageHeader";
import PaginationComponent from "@/components/Pagination";
import ProductFilters from "@/components/products/ProductFilters";
import ProductTable from "@/components/products/ProductTable";
import Showing from "@/components/Showing";
import { getProducts } from "@/services/product.service";
import { getStores } from "@/services/store.service";
import Link from "next/link";

export default async function Products({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ page?: string; size?: string; searchText?: string, storeId?: string }>;
}>) {
  const { page, size, searchText, storeId } = await searchParams;
  const products = await getProducts(
    Number(page) || 1,
    Number(size) || 10,
    searchText,
    storeId
  );
  const stores = await getStores();
  return (
    <>
      <PageHeader
        title="Products"
        breadcrumbItems={[
          { label: "Dashboard", link: "/dashboard" },
          { label: "Products" },
        ]}
        link="/dashboard/products/create"
        label="Add New Product"
      />
      <div className="mb-4">
        <ProductFilters stores={stores.stores} />
      </div>
      <div className="mb-4">
        <ProductTable products={products.products} />
      </div>{" "}
      {(Number(size) || 10) < products.total && (
        <div className="flex flex-col justify-between items-center gap-5">
          <PaginationComponent
            total={products.total}
            path="/dashboard/products"
          />
          <Showing
            total={products.total}
            size={Number(size) || 10}
            page={Number(page) || 1}
          />
        </div>
      )}
    </>
  );
}
