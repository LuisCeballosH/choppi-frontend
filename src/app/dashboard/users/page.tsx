import PageHeader from "@/components/PageHeader";
import PaginationComponent from "@/components/Pagination";
import Showing from "@/components/Showing";
import UserFilters from "@/components/users/UserFilters";
import UserTable from "@/components/users/UserTable";
import { getUsers } from "@/services/user.service";

export default async function Users({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ page?: string; size?: string; searchText?: string }>;
}>) {
  const { page, size, searchText } = await searchParams;
  const users = await getUsers(
    Number(page) || 1,
    Number(size) || 10,
    searchText
  );
  return (
    <>
      <PageHeader
        title="Users"
        breadcrumbItems={[
          { label: "Dashboard", link: "/dashboard" },
          { label: "Users" },
        ]}
        link="/dashboard/users/create"
        label="Add New User"
      />
      <div className="mb-4">
        <UserFilters />
      </div>
      <div className="mb-4">
        <UserTable users={users.users} />
      </div>
      {(Number(size) || 10) < users.total && (
        <div className="flex flex-col justify-between items-center gap-5">
          <PaginationComponent total={users.total} path="/dashboard/users" />
          <Showing
            total={users.total}
            size={Number(size) || 10}
            page={Number(page) || 1}
          />
        </div>
      )}
    </>
  );
}
