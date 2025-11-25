import ProductForm from "@/components/products/ProductForm";
import StoreForm from "@/components/stores/StoreForm";
import { getProduct } from "@/services/product.service";

export default async function EditProduct({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const product = await getProduct(id);
  return <ProductForm product={product} />;
}
