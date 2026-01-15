"use client";

import { SearchProjectsDto, SearchOrder } from "@/shared/api/openapi";
import { SEARCH_PROJECT_TYPES } from "@/public/content/better-bedrock";
import { useState, useRef, useEffect } from "react";
import { useProjectsCardSearch } from "@/pages/downloads/main/model/projects-card-search";
import { searchProjects } from "@/entities/project/api/search-projects";

interface UseInfiniteProjectsFetchProps {
    searchResults: SearchProjectsDto;
}

const searchCache = new Map<string, SearchProjectsDto>();

const getCacheKey = (
    type: string,
    order: string,
    query: string,
    page: number,
): string => {
    return `${type}|${order}|${query}|${page}`;
};

export const useInfiniteProjectsFetch = ({
    searchResults,
}: UseInfiniteProjectsFetchProps) => {
    const firstCachedKey = getCacheKey(
        SEARCH_PROJECT_TYPES.all.toLowerCase(),
        SearchOrder.Newest,
        "",
        1,
    );
    searchCache.set(firstCachedKey, searchResults);

    const { selectedOrder, selectedType, inputRef } = useProjectsCardSearch();

    const [projects, setProjects] = useState<SearchProjectsDto | undefined>(
        searchResults,
    );

    const [page, setPage] = useState<number>(1);

    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const fetchProjects = async (query: string, pageNum = 1, append = false) => {
        const type = selectedType === "all" ? "all" : selectedType;
        const cacheKey = getCacheKey(type, selectedOrder, query, pageNum);

        const cachedData = searchCache.get(cacheKey);
        if (cachedData) {
            if (append && projects) {
                setProjects({
                    ...cachedData,
                    items: [...(projects.items || []), ...(cachedData.items || [])],
                    page: cachedData.page,
                    total: cachedData.total ?? 0,
                    totalPages: cachedData.totalPages ?? 1,
                });
            } else {
                setProjects(cachedData);
            }
            setPage(pageNum);
            return;
        }

        if (!append) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }

        try {
            const data = await searchProjects(
                selectedType === "all" ? undefined : selectedType,
                selectedOrder as SearchOrder,
                query,
                pageNum,
            );

            if (data) {
                searchCache.set(cacheKey, data);
            }

            if (append && projects) {
                if (data) {
                    setProjects({
                        ...data,
                        items: [...(projects.items || []), ...(data.items || [])],
                        page: data.page,
                        total: data.total ?? 0,
                        totalPages: data.totalPages ?? 1,
                    });
                }
            } else {
                setProjects(data);
            }
            setPage(pageNum);
        } catch (err) {
            console.error("Failed fetching projects", err);
        } finally {
            if (!append) setLoading(false);
            else setLoadingMore(false);
        }
    };

    useEffect(() => {
        const query = inputRef.current?.value || "";
        setPage(1);
        fetchProjects(query, 1, false);

        const handleInputChange = () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
            debounceTimer.current = setTimeout(() => {
                const query = inputRef.current?.value || "";
                setPage(1);
                fetchProjects(query, 1, false);
            }, 500);
        };

        const inputEl = inputRef.current;
        inputEl?.addEventListener("input", handleInputChange);
        return () => {
            inputEl?.removeEventListener("input", handleInputChange);
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [selectedType, selectedOrder]);

    useEffect(() => {
        observerRef.current?.disconnect();

        if (!sentinelRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry.isIntersecting) return;

                if (loading || loadingMore) return;

                if (!projects) return;

                const currentPage = projects.page || page;
                const totalPages = projects.totalPages ?? 1;

                if (currentPage < totalPages) {
                    const nextPage = currentPage + 1;
                    const query = inputRef.current?.value || "";
                    fetchProjects(query, nextPage, true);
                }
            },
            {
                root: null,
                rootMargin: "200px",
                threshold: 0.1,
            },
        );

        observerRef.current.observe(sentinelRef.current);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [projects?.page, projects?.totalPages, loading, loadingMore, page]);

    return { loading, projects, loadingMore, sentinelRef };
};
