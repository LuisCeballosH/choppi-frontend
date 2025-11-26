import PageHeader from "@/components/PageHeader";
import UserForm from "@/components/users/UserForm";
import { getUser } from "@/services/user.service";

export default async function EditUser({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const user = await getUser(id);
  return (
    <>
      <PageHeader
        title="Edit User"
        breadcrumbItems={[
          { label: "Dashboard", link: "/dashboard" },
          { label: "Users", link: "/dashboard/users" },
          { label: "Edit User" },
        ]}
      />
      <UserForm user={user} />
    </>
  );
}
