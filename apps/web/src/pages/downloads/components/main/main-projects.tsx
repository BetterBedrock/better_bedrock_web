import { useEffect, useRef, useState } from "react";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { SearchProjectsDto } from "~/lib/api";
import { useProject } from "~/providers/project";
import { styles } from ".";
import { Input } from "~/components/bedrock/input";
import { PROJECT_TYPES } from "~/assets/content/better-bedrock";
import { CircularProgressIndicator } from "~/components/bedrock/circular-progress-indicator";
import { Button } from "~/components/bedrock/button";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Banner } from "~/components/bedrock/banner";

export const MainProjects = () => {
  const { search } = useProject();

  const [searchResults, setSearchResults] = useState<SearchProjectsDto | undefined>();

  const [selectedType, setSelectedType] = useState<string>(Object.keys(PROJECT_TYPES)[0]);
  const inputRef = useRef<HTMLInputElement>(null);

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
      const data = await search(selectedType, query, pageNum);
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
  }, [selectedType]);

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
  }, [selectedType]);

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

  const handleClickType = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className={styles.projects}>
      <Input ref={inputRef} placeholder="Search for a project" className={styles.searchbar} />
      <ButtonGroup className={styles.types}>
        {Object.entries(PROJECT_TYPES).map(([key, label]) => (
          <Button
            key={key}
            type={key === selectedType ? "green" : "white"}
            onClick={() => handleClickType(key)}
            isClicked={key === selectedType}
            isToggled={key === selectedType}
            center
          >
            <BedrockText text={label} color={key === selectedType ? "white" : "black"} type="p" />
          </Button>
        ))}
      </ButtonGroup>

      {loading && !searchResults ? (
        <div className={styles.loader}>
          <CircularProgressIndicator size="small" />
          <BedrockText text="Fetching Projects..." color="white" type="p" />
        </div>
      ) : (
        <>
          {(!searchResults || searchResults.items.length < 1) && (
            <Banner message="No projects found for this search :(" type="neutral" />
            // <div className={styles.loader}>
            //   <BedrockText
            //     text="No projects found for this search :("
            //     font="Minecraft"
            //     color="white"
            //     type="p"
            //   />
            // </div>
          )}

          {(searchResults?.items.length ?? 0) > 0 && (
            <>
              <div className={styles.list}>
                {searchResults!.items.map((project, index) => (
                  <GridDownloadCard key={project.id ?? index} project={project} mode="view" />
                ))}
              </div>
              <div ref={sentinelRef} />
            </>
          )}

          {loadingMore && (
            <div className={styles.loader}>
              <CircularProgressIndicator size="small" />
              <BedrockText text="Loading more..." color="white" type="p" />
            </div>
          )}
        </>
      )}
    </div>
  );
};
