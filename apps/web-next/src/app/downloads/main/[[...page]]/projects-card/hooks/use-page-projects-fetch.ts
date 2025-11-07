"use client";

import { SearchOrder, SearchProjectsDto } from "@/_lib/api";
import { useProject } from "@/_providers/project";
import { useProjectsCardSearch } from "@/app/downloads/main/[[...page]]/projects-card/providers";
import { useEffect, useRef, useState } from "react";

interface UsePageProjectsFetchProps {
    searchResults: SearchProjectsDto;
}

export const usePageProjectsFetch = ({ searchResults }: UsePageProjectsFetchProps) => {
    const { search } = useProject();
    const { selectedOrder, selectedType, inputRef } = useProjectsCardSearch();

    const [projects, setProjects] = useState<SearchProjectsDto>(searchResults);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const fetchSearchResults = async (page?: number) => await search(
        selectedOrder as SearchOrder,
        selectedType === "all" ? undefined : selectedType,
        inputRef.current?.value || "",
        page ?? searchResults.page,
    );

    useEffect(() => {
        fetchSearchResults().then((data) => {
            if (data) setProjects(data)
        });
    }, [selectedOrder, selectedType]);

    useEffect(() => {
        const handleInputChange = () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
            debounceTimer.current = setTimeout(() => {
                fetchSearchResults(1).then((data) => {
                    if (data) setProjects(data)
                });
            }, 500);
        };
        const inputEl = inputRef.current;
        inputEl?.addEventListener("input", handleInputChange);
        return () => {
            inputEl?.removeEventListener("input", handleInputChange);
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [selectedType, selectedOrder]);

    return projects;
};