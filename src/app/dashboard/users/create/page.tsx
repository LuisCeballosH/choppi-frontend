import PageHeader from "@/components/PageHeader";
import UserForm from "@/components/users/UserForm";

export default async function CreateUser() {
  return (
    <>
      <PageHeader
        title="Create User"
        breadcrumbItems={[
          { label: "Dashboard", link: "/dashboard" },
          { label: "Users", link: "/dashboard/users" },
          { label: "Create User" },
        ]}
      />
      <UserForm />
    </>
  );
}
