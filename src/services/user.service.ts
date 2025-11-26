import { User, UserResponse } from "@/interfaces/user";
import { verifySession } from "@/lib/dal";
import { notFound } from "next/navigation";

export async function getUsers(
  page?: number,
  size?: number,
  searchText?: string,
  sortBy?: string,
  sortOrder?: "asc" | "desc"
): Promise<UserResponse> {
  const { token } = await verifySession();

  const params = new URLSearchParams();
  if (page) params.set("page", String(page));
  if (size) params.set("size", String(size));
  if (searchText) params.set("searchText", searchText);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder) params.set("order", sortOrder);
  try {
    const data = await fetch(
      `${process.env.API_URL}/api/users?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.ok) {
      const response: UserResponse = await data.json();
      return response;
    }
    return { total: 0, users: [] };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { total: 0, users: [] };
  }
}

export async function getUser(id: string): Promise<User | null> {
  const { token } = await verifySession();
  try {
    const data = await fetch(`${process.env.API_URL}/api/users/${id}`, {
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
