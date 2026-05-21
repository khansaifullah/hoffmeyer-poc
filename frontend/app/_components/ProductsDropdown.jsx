"use client";

import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/categories";
import { getSlug } from "@/lib/slug";

export default function ProductsDropdown() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-8 gap-1.5 rounded-none px-0 text-[16px] font-bold text-white hover:bg-transparent hover:text-white/85 data-popup-open:bg-transparent data-popup-open:text-white"
          />
        }
      >
        Products
        <ChevronDownIcon className="size-3.5 transition-transform duration-200 group-data-[popup-open]/button:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className="max-h-80 min-w-64 overflow-y-auto rounded-sm border border-[#d9e0e8] bg-white p-1 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[#16568D]">
            Shop by Category
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#e7ebf0]" />

          {categories.map((category) => (
            <DropdownMenuItem
              key={category.name}
              render={<Link href={`/category/${getSlug(category.name)}`} />}
              className="cursor-pointer rounded-sm px-3 py-2 text-[14px] font-medium text-[#333] focus:bg-[#16568D]/12 focus:text-[#16568D]"
            >
              {category.name.replace(/\n/g, " ")}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
