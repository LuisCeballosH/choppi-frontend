"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { User } from "@/interfaces/user";
import { createUser, updateUser } from "@/actions/user.action";

const schema = z.object({
  email: z
    .email("Invalid email address")
    .min(1, "The email is required")
    .trim(),
  username: z.string().min(1, "The username is required").trim(),
  password: z.string().trim().optional(),
});

export type UserFormInputs = z.infer<typeof schema>;

interface Props {
  user?: User | null;
}

const UserForm = ({ user }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email,
      username: user?.username,
    },
  });
  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    let response;

    if (user) {
      response = await updateUser(user.id, data);
    } else {
      response = await createUser(data);
    }

    if (response.success) {
      router.push("/dashboard/users");
    } else {
      alert(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 @2xl/main:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="form-label">Email</label>
          <Input
            type="email"
            placeholder="Enter the email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-[#e02424] text-sm">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label className="form-label">Username</label>
          <Input
            type="text"
            placeholder="Enter the username"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-[#e02424] text-sm">
              {errors.username.message}
            </span>
          )}
        </div>
        <div>
          <label className="form-label">Password</label>
          <Input
            type="password"
            placeholder="Enter the password"
            {...register("password")}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 @2xl/main:grid-cols-2 gap-4 mb-4">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default UserForm;
