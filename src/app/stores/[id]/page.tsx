import { getStore } from "@/services/store.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function ViewStore({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const store = await getStore(id);

  if (!store) {
    return (
      <div className="p-6">
        <p>Store not found.</p>
        <Link href="/stores" className="text-sm text-primary underline">
          Back to stores
        </Link>
      </div>
    );
  }

  const createdAt = new Date(store.createdAt).toLocaleString();
  const updatedAt = store.updatedAt ? new Date(store.updatedAt).toLocaleString() : null;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>{store.name}</CardTitle>
          <CardDescription>Store details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {store.description && (
              <p className="text-sm text-muted-foreground">{store.description}</p>
            )}

            <div className="text-sm text-muted-foreground">
              <div>Created: {createdAt}</div>
              {updatedAt && <div>Updated: {updatedAt}</div>}
            </div>

            <div>
              <Link href="/stores" className="text-sm text-primary underline">
                Back to stores
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
