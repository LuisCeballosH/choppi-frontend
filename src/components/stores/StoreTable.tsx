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
import { deleteStore } from "@/actions/store.action";
import { useRouter } from "next/navigation";

interface Props {
  stores: Store[];
}

const StoreTable = ({ stores }: Props) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const response = await deleteStore(id);
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
        {stores.map((store) => (
          <TableRow key={store.id}>
            <TableCell className="font-medium">{store.name}</TableCell>
            <TableCell>{store.description}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Link href={`/dashboard/stores/${store.id}`}>Edit</Link>
                <Button onClick={() => handleDelete(store.id)}>Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StoreTable;
