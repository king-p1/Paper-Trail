"use client";
import { SearchIcon, XIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSearchParams } from "@/hooks/use-seearch-param";
 
export const SearchInput = () => {
  const [search, setSearch] = useSearchParams();
  const [value, setValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault()
setSearch(value)
inputRef.current?.blur();
};

const handleInputClear = () => {
    setValue("");
    setSearch("")
    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <form action="" className="relative w-full max-w-[720px]" 
      onSubmit={handleSubmit}
      >
        <Input
          value={value}
          onChange={handleInput}
          ref={inputRef}
          placeholder="Search trails..."
          className="md:text-base placeholder:text-neutral-800 px-14 w-full border-neutral-300 focus-visible:shadow-[0_10px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] rounded-full h-[48px] focus:bg-white bg-neutral-100"
        />
        <Button
          size="icon"
          type="submit"
          className="absolute left-3 top-1/2 rounded-full -translate-y-1/2 [&_svg]:size-4 size-7 flex items-center justify-center"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            size="icon"
            type="button"
            variant="ghost"
            className="absolute right-3 top-1/2 rounded-full -translate-y-1/2 [&_svg]:size-4 size-7 flex items-center justify-center font-bold"
            onClick={handleInputClear}
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
};
