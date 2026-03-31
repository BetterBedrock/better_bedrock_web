"use client";

import { Input } from "@/shared/ui/input";
import { ProjectsCardOrder } from "./projects-card-order";

import styles from "./projects-card.module.scss";
import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchOrder } from "@/shared/lib/openapi";

interface ProjectsCardSearchBarProps {
  defaultSearch?: string;
  defaultOrder: SearchOrder;
}

export const ProjectsCardSearchBar = ({
  defaultSearch,
  defaultOrder,
}: ProjectsCardSearchBarProps) => {
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleInputChange = () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set("s", inputRef.current?.value || "");
        const href = `${pathname}?${params.toString()}`;
        router.push(href);
      }, 500);
    };
    const inputEl = inputRef.current;
    inputEl?.addEventListener("input", handleInputChange);
    return () => {
      inputEl?.removeEventListener("input", handleInputChange);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [pathname, router, searchParams]);

  return (
    <div className={styles.searchbarContainer}>
      <Input
        sub
        ref={inputRef}
        placeholder="Search for a project"
        className={styles.searchbar}
        defaultValue={defaultSearch}
      />
      <ProjectsCardOrder className={styles.orderHalf} defaultOrder={defaultOrder} />
    </div>
  );
};
