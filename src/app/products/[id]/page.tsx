import { getProduct } from "@/services/product.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function ViewProduct({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="p-6">
        <p>Product not found.</p>
        <Link href="/products" className="text-sm text-primary underline">
          Back to products
        </Link>
      </div>
    );
  }

  const createdAt = new Date(product.createdAt).toLocaleString();
  const updatedAt = product.updatedAt ? new Date(product.updatedAt).toLocaleString() : null;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>Product details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {product.description && (
              <p className="text-sm text-muted-foreground">{product.description}</p>
            )}

            <div className="flex gap-4">
              <div>
                <h4 className="text-xs text-muted-foreground">Stock</h4>
                <div className="font-medium">{product.stock}</div>
              </div>

              <div>
                <h4 className="text-xs text-muted-foreground">Stores</h4>
                <div className="flex gap-2">
                  {(product.stores || []).map((s) => (
                    <span key={s.id} className="text-sm px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <div>Created: {createdAt}</div>
              {updatedAt && <div>Updated: {updatedAt}</div>}
            </div>

            <div>
              <Link href="/products" className="text-sm text-primary underline">
                Back to products
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
