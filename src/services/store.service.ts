import { Store, StoreResponse } from "@/interfaces/store";
import { verifySession } from "@/lib/dal";
import { notFound } from "next/navigation";

export async function getStores(
  page?: number,
  size?: number,
  searchText?: string,
  sortBy?: string,
  sortOrder?: "asc" | "desc"
): Promise<StoreResponse> {
  const params = new URLSearchParams();
  if (page) params.set("page", String(page));
  if (size) params.set("size", String(size));
  if (searchText) params.set("searchText", searchText);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder) params.set("order", sortOrder);
  try {
    const data = await fetch(
      `${process.env.API_URL}/api/stores?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.ok) {
      const response: StoreResponse = await data.json();
      return response;
    }
    return { total: 0, stores: [] };
  } catch (error) {
    console.error("Error fetching stores:", error);
    return { total: 0, stores: [] };
  }
}

export async function getStore(id: string): Promise<Store | null> {
  try {
    const data = await fetch(`${process.env.API_URL}/api/stores/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
