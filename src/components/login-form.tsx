"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useActionState, useEffect } from "react";
import { login } from "@/actions/auth.action";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action, pending] = useActionState(login, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state, router]);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  defaultValue={
                    typeof state?.values?.email === "string"
                      ? state.values.email
                      : ""
                  }
                />

                {state?.errors?.email && (
                  <span className="text-[#e02424] text-sm">
                    {state.errors.email}
                  </span>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="password"
                  defaultValue={
                    typeof state?.values?.password === "string"
                      ? state.values.password
                      : ""
                  }
                />
                {state?.errors?.password && (
                  <span className="text-[#e02424] text-sm">
                    {state.errors.password}
                  </span>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={pending}>
                  Login
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
