import { useState, useRef, useEffect } from "react";
import { SearchProjectsDto, SearchOrder } from "~/lib/api";
import { useProjectsCardSearch } from "~/pages/downloads/components/main/projects-card/providers/projects-card-search";
import { useProject } from "~/providers/project";

export const useInfiniteProjectsFetch = () => {
    const { search } = useProject();
    const { selectedOrder, selectedType, inputRef } = useProjectsCardSearch();

    const [searchResults, setSearchResults] = useState<SearchProjectsDto | undefined>();

    const [page, setPage] = useState<number>(1);

    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const fetchProjects = async (query: string, pageNum = 1, append = false) => {
        if (!append) setLoading(true);
        else setLoadingMore(true);

        try {
            const data = await search(
                selectedOrder as SearchOrder,
                selectedType === "all" ? undefined : selectedType,
                query,
                pageNum,
            );
            if (append && searchResults) {
                if (data) {
                    setSearchResults({
                        ...data,
                        items: [...(searchResults.items || []), ...(data.items || [])],
                        page: data.page,
                        total: data.total ?? 0,
                        totalPages: data.totalPages ?? 1,
                    });
                }
            } else {
                setSearchResults(data);
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
        setSearchResults(undefined);
        fetchProjects(query, 1, false);
    }, [selectedType, selectedOrder]);

    useEffect(() => {
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

                if (!searchResults) return;

                const currentPage = searchResults.page || page;
                const totalPages = searchResults.totalPages ?? 1;

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
    }, [searchResults?.page, searchResults?.totalPages, loading, loadingMore, page]);

    return { loading, searchResults, loadingMore, sentinelRef }
};