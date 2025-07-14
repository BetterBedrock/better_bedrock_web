import { styles } from ".";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { DownloadsItemDto } from "@better-bedrock/constants/downloads.dto";
import { Button } from "~/components/bedrock/button";
import { ButtonGroup } from "~/components/button-group/button-group";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { useNavigate } from "react-router-dom";
import { Routes } from "~/utils/routes";
import { baseUrl } from "~/utils/url";

interface CommunityListProps {
  items: DownloadsItemDto[];
}

export const CommunityList = ({ items }: CommunityListProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <GridDownloadCard
          key={item.downloadId}
          title={item.title}
          downloadSize={`${item.itemWeight} MB`}
          description={
            <BedrockText text={`@${item.creator}`} type={"p"} textAlign="left" color="white" />
          }
          thumbnail={<img src={`${baseUrl}${item.imageAssetUrl[0]}`} alt={""} />}
          actions={
            <ButtonGroup>
              <Button
                onClick={() => setDownload(item)}
                text="Download"
                width="100%"
                height="auto"
                type="alwaysGreen"
              />
              <Button
                text="Preview"
                width="100%"
                height="auto"
                type="alwaysWhite"
                onClick={() => navigate(`${Routes.PREVIEW}/${item.downloadId}`)}
              />
            </ButtonGroup>
          }
        />
      ))}
    </div>
  );
};
