import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { User } from "@/interfaces/user";

export const verifySession = cache(
  async (): Promise<{ isAuth: boolean; user: User | null; token: string }> => {
    const cookieStore = await cookies();
    const user: User | null = JSON.parse(
      cookieStore.get("user")?.value || "null"
    );
    const token: string = cookieStore.get("token")?.value || "";

    if (user === null || token === "") {
      redirect("/login");
    }

    return { isAuth: true, user, token };
  }
);
