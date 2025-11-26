"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface Props {
  total: number;
  path: string;
}
const PaginationComponent = ({ total, path }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const size = Number(searchParams.get("size") || 10);
  const totalPages = Math.max(1, Math.ceil(total / size));

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    params.set("size", String(size));
    router.push(`${path}?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (page <= 3) {
      end = Math.min(5, totalPages);
    }
    if (page >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handlePageChange(page - 1)} className="cursor-pointer" />
        </PaginationItem>
        {getPageNumbers().map((num) => (
          <PaginationItem key={num}>
            <PaginationLink onClick={() => handlePageChange(num)}>
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(page + 1)} className="cursor-pointer" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
