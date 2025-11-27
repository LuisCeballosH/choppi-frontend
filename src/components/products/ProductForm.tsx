"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Product } from "@/interfaces/product";
import { createProduct, updateProduct } from "@/actions/product.action";
import { MultiSelect } from "../multi-select";
import { Store } from "@/interfaces/store";
import { useEffect, useState } from "react";

const schema = z.object({
  name: z.string().min(1, "The name is required").trim(),
  description: z.string().trim().optional(),
  storeIds: z.array(z.string()).min(1, "At least one store must be selected"),
  stock: z.number().min(0, "Stock must be at least 0").optional(),
});

export type ProductFormInputs = z.infer<typeof schema>;

interface Props {
  product?: Product | null;
  stores: Store[];
}

const ProductForm = ({ product, stores }: Props) => {
  const router = useRouter();
  const [selectedStores, setSelectedStores] = useState<string[]>(
    product?.stores?.map((store) => store.id) || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product?.name,
      description: product?.description,
      stock: product?.stock || 0,
    },
  });

  useEffect(() => {
    setValue("storeIds", selectedStores);
  }, [selectedStores, setValue]);

  const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
    let response;

    if (product) {
      response = await updateProduct(product.id, data);
    } else {
      response = await createProduct(data);
    }

    if (response.success) {
      router.push("/dashboard/products");
    } else {
      alert(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 @2xl/main:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="form-label">Name</label>
          <Input
            type="text"
            placeholder="Enter the name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-[#e02424] text-sm">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label className="form-label">Stock</label>
          <Input
            type="number"
            placeholder="Ingrese el stock"
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <span className="text-[#e02424] text-sm">
              {errors.stock.message}
            </span>
          )}
        </div>
        <div>
          <label className="form-label">Stores</label>
          <MultiSelect
            options={stores}
            value={selectedStores}
            onChange={setSelectedStores}
            placeholder="Select stores"
            optionLabel="name"
            optionValue="id"
          />
          {errors.storeIds && (
            <span className="text-[#e02424] text-sm">
              {errors.storeIds.message}
            </span>
          )}
        </div>
        <div>
          <label className="form-label">Description</label>
          <Textarea
            placeholder="Enter the description"
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
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default ProductForm;
