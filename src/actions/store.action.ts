"use server";

import { StoreFormInputs } from "@/components/stores/StoreForm";
import { verifySession } from "@/lib/dal";

export async function createStore(
  data: StoreFormInputs
): Promise<{ success: boolean; message: string }> {
  const { token } = await verifySession();
  try {
    const response = await fetch(`${process.env.API_URL}/api/stores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log(response)
    if (response.ok) {
      return {
        success: true,
        message: "Store created successfully",
      };
    }
    return {
      success: false,
      message: "Failed to create store",
    };
  } catch (error) {
    console.error("Error creating store:", error);
    return {
      success: false,
      message: "Failed to create store",
    };
  }
}

export async function updateStore(
  id: string,
  data: StoreFormInputs
): Promise<{ success: boolean; message: string }> {
  const { token } = await verifySession();
  try {
    const response = await fetch(`${process.env.API_URL}/api/stores/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return {
        success: true,
        message: "Store updated successfully",
      };
    }
    return {
      success: false,
      message: "Failed to update store",
    };
  } catch (error) {
    console.error("Error updating store:", error);
    return {
      success: false,
      message: "Failed to update store",
    };
  }
}

export async function deleteStore(
  storeId: string
): Promise<{ success: boolean; message: string }> {
  const { token } = await verifySession();
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/stores/${storeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      return {
        success: true,
        message: "Store deleted successfully",
      };
    }
    return {
      success: false,
      message: "Failed to delete store",
    };
  } catch (error) {
    console.error("Error deleting store:", error);
    return {
      success: false,
      message: "Failed to delete store",
    };
  }
}
