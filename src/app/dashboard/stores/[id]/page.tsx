import PageHeader from "@/components/PageHeader";
import StoreForm from "@/components/stores/StoreForm";
import { getStore } from "@/services/store.service";

export default async function EditStore({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const store = await getStore(id);
  return (
    <>
      <PageHeader
        title="Edit Store"
        breadcrumbItems={[
          { label: "Dashboard", link: "/dashboard" },
          { label: "Stores", link: "/dashboard/stores" },
          { label: "Edit Store" },
        ]}
      />
      <StoreForm store={store} />
    </>
  );
}
