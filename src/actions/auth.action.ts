"use server";

import { LoginResponse } from "@/interfaces/auth";
import { FormState, LoginFormSchema } from "@/schemas/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(state: FormState, formData: FormData) {
  const cookieStore = await cookies();
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        email: formData.get("email") || "",
        password: formData.get("password") || "",
      },
    };
  }
  const { email, password } = validatedFields.data;

  try {
    const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const responseData: LoginResponse = await response.json();
      cookieStore.set("token", responseData.token);
      cookieStore.set("user", JSON.stringify(responseData.user));
      return {
        success: true,
        message: "Login successful",
      };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Login failed" };
    }
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("user");
  redirect("/login");
}
