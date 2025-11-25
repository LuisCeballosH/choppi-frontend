"use server";

import { ProductFormInputs } from "@/components/products/ProductForm";
import { verifySession } from "@/lib/dal";

export async function createProduct(
  data: ProductFormInputs
): Promise<{ success: boolean; message: string }> {
  const { token } = await verifySession();
  try {
    const response = await fetch(`${process.env.API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, stores: [] }),
    });
    console.log(response);
    if (response.ok) {
      return {
        success: true,
        message: "Product created successfully",
      };
    }
    return {
      success: false,
      message: "Failed to create product",
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: "Failed to create product",
    };
  }
}

export async function updateProduct(
  id: string,
  data: ProductFormInputs
): Promise<{ success: boolean; message: string }> {
  const { token } = await verifySession();
  try {
    const response = await fetch(`${process.env.API_URL}/api/products/${id}`, {
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
        message: "Product updated successfully",
      };
    }
    return {
      success: false,
      message: "Failed to update product",
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      message: "Failed to update product",
    };
  }
}

export async function deleteProduct(
  productId: string
): Promise<{ success: boolean; message: string }> {
  const { token } = await verifySession();
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/products/${productId}`,
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
        message: "Product deleted successfully",
      };
    }
    return {
      success: false,
      message: "Failed to delete product",
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      message: "Failed to delete product",
    };
  }
}
