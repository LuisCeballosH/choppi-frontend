import PaginationComponent from "@/components/Pagination";
import Showing from "@/components/Showing";
import StoreFilters from "@/components/stores/StoreFilters";
import StoreTable from "@/components/stores/StoreTable";
import { getStores } from "@/services/store.service";
import Link from "next/link";

export default async function Stores({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ page?: string; size?: string; searchText?: string }>;
}>) {
  const { page, size, searchText } = await searchParams;
  const stores = await getStores(
    Number(page) || 1,
    Number(size) || 10,
    searchText
  );
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <StoreFilters />
        <Link href="/dashboard/stores/create">Create Store</Link>
      </div>
      <div className="mb-4">
        <StoreTable stores={stores.stores} />
      </div>{" "}
      {(Number(size) || 10) < stores.total && (
        <div className="flex flex-col justify-between items-center gap-5">
          <PaginationComponent total={stores.total} path="/dashboard/stores" />
          <Showing
            total={stores.total}
            size={Number(size) || 10}
            page={Number(page) || 1}
          />
        </div>
      )}
    </>
  );
}
