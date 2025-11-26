"use server";

import { UserFormInputs } from "@/components/users/UserForm";
import { verifySession } from "@/lib/dal";

export async function createUser(
  data: UserFormInputs
): Promise<{ success: boolean; message: string }> {
  const { token } = await verifySession();
  try {
    const response = await fetch(`${process.env.API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return {
        success: true,
        message: "User created successfully",
      };
    }
    return {
      success: false,
      message: "Failed to create user",
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      message: "Failed to create user",
    };
  }
}

export async function updateUser(
  id: string,
  data: UserFormInputs
): Promise<{ success: boolean; message: string }> {
  const { token } = await verifySession();
  try {
    const response = await fetch(`${process.env.API_URL}/api/users/${id}`, {
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
        message: "User updated successfully",
      };
    }
    return {
      success: false,
      message: "Failed to update user",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "Failed to update user",
    };
  }
}

export async function deleteUser(
  userId: string
): Promise<{ success: boolean; message: string }> {
  const { token } = await verifySession();
  try {
    const response = await fetch(`${process.env.API_URL}/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return {
        success: true,
        message: "User deleted successfully",
      };
    }
    return {
      success: false,
      message: "Failed to delete user",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "Failed to delete user",
    };
  }
}
