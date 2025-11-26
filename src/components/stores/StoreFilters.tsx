"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/input";

const StoreFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("searchText") || ""
  );
  const size = Number(searchParams.get("size") || 10);

  const debouncedSearch = useDebounce((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("size", String(size));
    if (value) {
      params.set("searchText", value);
    } else {
      params.delete("searchText");
    }
    router.push(`/dashboard/stores?${params.toString()}`);
  }, 400);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <div className="grid grid-cols-1 @3xl/main:grid-cols-2 @4xl/main:grid-cols-3 @6xl/main:grid-cols-4 gap-4">
      <Input
        type="text"
        placeholder="Buscar"
        value={inputValue}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default StoreFilters;
