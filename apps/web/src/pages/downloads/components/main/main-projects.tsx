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

export const MainProjects = () => {
  const { search } = useProject();
  const [searchResults, setSearchResults] = useState<SearchProjectsDto | undefined>();
  const [selectedType, setSelectedType] = useState<string>(Object.keys(PROJECT_TYPES)[0]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // Debounce timer ref
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const updateProjects = async (query: string) => {
    setLoading(true);
    const data = await search(selectedType, query);
    setSearchResults(data);
    setLoading(false);
  };

  useEffect(() => {
    const query = inputRef.current?.value || "";
    updateProjects(query);
  }, [selectedType]);

  useEffect(() => {
    const handleInputChange = () => {
      setLoading(true);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        const query = inputRef.current?.value || "";
        updateProjects(query);
      }, 500);
    };

    const inputEl = inputRef.current;
    inputEl?.addEventListener("input", handleInputChange);

    return () => {
      inputEl?.removeEventListener("input", handleInputChange);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [selectedType]); // reset debounce if type changes

  const handleClickType = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className={styles.projects}>
      <BedrockText text="Projects:" font="Minecraft" type="h1" color="white" textAlign="start" />
      <Input ref={inputRef} placeholder="Search for a project" className={styles.searchbar} />
      <ButtonGroup className={styles.types}>
        {Object.entries(PROJECT_TYPES).map(([key, label]) => (
          <Button
            key={key}
            // transparent
            // toggled
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
      {loading ? (
        <div className={styles.loader}>
          <CircularProgressIndicator size="medium" />
          <BedrockText text="Fetching Projects..." color="white" type="p" />
        </div>
      ) : (
        <>
          {!searchResults ||
            (searchResults.items.length < 1 && (
              <div className={styles.loader}>
                <BedrockText
                  text="No projects found for this search :("
                  font="Minecraft"
                  color="white"
                  type="p"
                />
              </div>
            ))}
          <div className={styles.list}>
            {searchResults?.items.map((project, index) => (
              <GridDownloadCard key={index} project={project} mode="view" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
