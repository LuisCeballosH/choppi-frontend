"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Store } from "@/interfaces/store";
import { buildFilterParams } from "@/utils/build-filter-params";

interface Props {
  stores: Store[];
}

const SecondProductFilters = ({ stores }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("searchText") || ""
  );
  const size = Number(searchParams.get("size") || 10);

  const [storeId, setStoreId] = useState(searchParams.get("storeId") || "");

  const debouncedSearch = useDebounce((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("size", String(size));
    if (value) {
      params.set("searchText", value);
    } else {
      params.delete("searchText");
    }
    router.push(`/products?${params.toString()}`);
  }, 400);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategoryId = event.target.value;
    setStoreId(newCategoryId);
    const params = buildFilterParams(
      searchParams,
      { searchText: inputValue, storeId: newCategoryId },
      size
    );
    router.push(`/products?${params.toString()}`);
  };

  const handleClear = () => {
    setInputValue("");
    setStoreId("");
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("size", String(size));
    params.delete("searchText");
    params.delete("storeId");
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      <Input
        type="text"
        placeholder="Buscar"
        value={inputValue}
        onChange={handleSearchChange}
      />
      <Select
        value={storeId}
        onValueChange={(value) =>
          handleStoreChange({
            target: { value },
          } as unknown as React.ChangeEvent<HTMLSelectElement>)
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a store" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Stores</SelectLabel>
            {stores.map((store) => (
              <SelectItem key={store.id} value={store.id}>
                {store.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>
        <Button variant="outline" onClick={handleClear} className="w-full">
          Clear filters
        </Button>
      </div>
    </div>
  );
};

export default SecondProductFilters;
