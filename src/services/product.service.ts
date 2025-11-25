import { Product, ProductResponse } from "@/interfaces/product";
import { verifySession } from "@/lib/dal";
import { notFound } from "next/navigation";

export async function getProducts(
  page?: number,
  size?: number,
  searchText?: string,
  sortBy?: string,
  sortOrder?: "asc" | "desc"
): Promise<ProductResponse> {
  const { token } = await verifySession();

  const params = new URLSearchParams();
  if (page) params.set("page", String(page));
  if (size) params.set("size", String(size));
  if (searchText) params.set("searchText", searchText);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder) params.set("order", sortOrder);
  try {
    const data = await fetch(
      `${process.env.API_URL}/api/products?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.ok) {
      const response: ProductResponse = await data.json();
      return response;
    }
    return { total: 0, products: [] };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { total: 0, products: [] };
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  const { token } = await verifySession();
  try {
    const data = await fetch(`${process.env.API_URL}/api/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.ok) {
      return data.json();
    }
    notFound();
  } catch (error) {
    console.error("Error fetching category:", error);
    notFound();
  }
}
