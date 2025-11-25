"use client";

import { Store } from "@/interfaces/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Product } from "@/interfaces/product";
import { deleteProduct } from "@/actions/product.action";

interface Props {
  products: Product[];
}

const ProductTable = ({ products }: Props) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const response = await deleteProduct(id);
    if (response.success) {
      router.refresh();
    } else {
      alert(response.message);
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Desciption</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Link href={`/dashboard/products/${product.id}`}>Edit</Link>
                <Button onClick={() => handleDelete(product.id)}>Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
