import PageHeader from "@/components/PageHeader";
import StoreForm from "@/components/stores/StoreForm";

export default async function CreateStore() {
  return (
    <>
      <PageHeader
        title="Create Store"
        breadcrumbItems={[
          { label: "Dashboard", link: "/dashboard" },
          { label: "Stores", link: "/dashboard/stores" },
          { label: "Create Store" },
        ]}
      />
      <StoreForm />
    </>
  );
}
