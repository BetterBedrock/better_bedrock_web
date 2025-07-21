import { styles } from ".";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { Gallery } from "~/components/bedrock/gallery";
import { useState } from "react";
import { Button } from "~/components/bedrock/button";
import { ButtonGroup } from "~/components/button-group/button-group";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { baseUrl } from "~/utils/url";
import { DownloadsItemDto } from "~/lib/api";

interface SideProjectsListProps {
  items: DownloadsItemDto[];
}

export const SideProjectsList = ({ items }: SideProjectsListProps) => {
  const [showPreview, setShowPreview] = useState(false);

  const [selectedDownlolad, setSelectedDownload] = useState<string | undefined>();

  return (
    <div className={styles.list}>
      <Gallery
        images={(
          (items.find((item) => item.downloadId === selectedDownlolad)?.imageAssetUrl ??
            []) as string[]
        ).map((image) => `${baseUrl}${image}`)}
        show={showPreview}
        onClose={() => {
          setShowPreview((prev) => !prev);
        }}
      />
      {items.map((item) => (
        <GridDownloadCard
          key={item.downloadId}
          title={item.title}
          description={
            <BedrockText text={item.description} type={"p"} textAlign="left" color="white" />
          }
          thumbnail={<img src={`${baseUrl}${item.imageAssetUrl[0]}`} alt={""} />}
          actions={
            <ButtonGroup>
              <Button
                // style={{ margin: "5px" }}
                text="Download"
                width={"100%"}
                height={"auto"}
                type="alwaysGreen"
              />
              <Button
                // style={{ margin: "5px" }}
                text="Preview"
                width={"100%"}
                height={"auto"}
                type="alwaysWhite"
                onClick={() => {
                  setSelectedDownload(item.downloadId);
                  setShowPreview(true);
                }}
              />
            </ButtonGroup>
          }
        />
      ))}
    </div>
  );
};
