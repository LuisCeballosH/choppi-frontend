"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Store } from "@/interfaces/store";
import { createStore, updateStore } from "@/actions/store.action";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").trim(),
  description: z.string().trim().optional(),
});

export type StoreFormInputs = z.infer<typeof schema>;

interface Props {
  store?: Store | null;
}

const StoreForm = ({ store }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: store?.name,
      description: store?.description,
    },
  });
  const onSubmit: SubmitHandler<StoreFormInputs> = async (data) => {
    let response;

    if (store) {
      response = await updateStore(store.id, data);
    } else {
      response = await createStore(data);
    }

    if (response.success) {
      router.push("/dashboard/stores");
    } else {
      alert(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 @2xl/content:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="form-label">Nombre</label>
          <Input
            type="text"
            placeholder="Ingrese el nombre"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-[#e02424] text-sm">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label className="form-label">Descripción</label>
          <Textarea
            placeholder="Ingrese la descripción"
            {...register("description")}
          ></Textarea>
          {errors.description && (
            <span className="text-[#e02424] text-sm">
              {errors.description.message}
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 @2xl/main:grid-cols-2 gap-4 mb-4">
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
};

export default StoreForm;
