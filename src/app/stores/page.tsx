import PaginationComponent from "@/components/Pagination";
import SecondProductFilters from "@/components/products/SecondProductFilters";
import Showing from "@/components/Showing";
import SecondStoreFilters from "@/components/stores/SecondStoreFilters";
import SecondStoreTable from "@/components/stores/SecondStoreTable";
import { getStores } from "@/services/store.service";

export default async function Products({
  searchParams,
}: Readonly<{
  searchParams: Promise<{
    page?: string;
    size?: string;
    searchText?: string;
    storeId?: string;
  }>;
}>) {
  const { page, size, searchText } = await searchParams;
  const stores = await getStores(
    Number(page) || 1,
    Number(size) || 10,
    searchText
  );
  return (
    <div className="p-4">
      <div className="mb-4">
        <SecondStoreFilters />
      </div>
      <div className="mb-4">
        <SecondStoreTable stores={stores.stores} />
      </div>{" "}
      {(Number(size) || 10) < stores.total && (
        <div className="flex flex-col justify-between items-center gap-5">
          <PaginationComponent total={stores.total} path="/stores" />
          <Showing
            total={stores.total}
            size={Number(size) || 10}
            page={Number(page) || 1}
          />
        </div>
      )}
    </div>
  );
}
