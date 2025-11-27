import PaginationComponent from "@/components/Pagination";
import SecondProductFilters from "@/components/products/SecondProductFilters";
import SecondProductTable from "@/components/products/SecondProductTable";
import Showing from "@/components/Showing";
import { getProducts } from "@/services/product.service";
import { getStores } from "@/services/store.service";

export default async function ProductPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{
    page?: string;
    size?: string;
    searchText?: string;
    storeId?: string;
  }>;
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
    <div className="p-4">
      <div className="mb-4">
        <SecondProductFilters stores={stores.stores} />
      </div>
      <div className="mb-4">
        <SecondProductTable products={products.products} />
      </div>{" "}
      {(Number(size) || 10) < products.total && (
        <div className="flex flex-col justify-between items-center gap-5">
          <PaginationComponent total={products.total} path="/products" />
          <Showing
            total={products.total}
            size={Number(size) || 10}
            page={Number(page) || 1}
          />
        </div>
      )}
    </div>
  );
}
