import StoreForm from "@/components/stores/StoreForm";
import { getStore } from "@/services/store.service";

export default async function EditStore({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const store = await getStore(id);
  return <StoreForm store={store} />;
}
