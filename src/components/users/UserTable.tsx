"use client";

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
import { User } from "@/interfaces/user";
import { deleteUser } from "@/actions/user.action";

interface Props {
  users: User[];
}

const UserTable = ({ users }: Props) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    const response = await deleteUser(id);
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
          <TableHead className="w-[100px]">Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Link
                  className="py-2 px-4 bg-[#171717] rounded-lg text-white font-semibold text-sm"
                  href={`/dashboard/users/${user.id}`}
                >
                  Edit
                </Link>
                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
