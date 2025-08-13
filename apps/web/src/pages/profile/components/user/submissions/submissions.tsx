import { useNavigate } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Link } from "~/components/link";
import { styles } from ".";
import { Routes } from "~/utils/routes";
import { baseUrl } from "~/utils/url";

export const Submissions = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.list}>
      <Button type="green" onClick={() => navigate(Routes.CREATE)} center>
        <BedrockText text="Submit A Project" type="p" color="white" />
      </Button>
      <div className={styles.projects}>
        <GridDownloadCard
          // key={item.downloadId}
          title={"Test"}
          tags={["deprected"]}
          description={<BedrockText text={`@iDarkQ`} type={"p"} textAlign="left" color="white" />}
          thumbnail={`${baseUrl}/static/uploads/public/images/themes/v8/blue_ui/1.png`}
          actions={
            <ButtonGroup>
              <Button
                // onClick={() => setDownloadItem(item)}
                width="100%"
                height="auto"
                type="green"
                center
              >
                <BedrockText color="white" text="Download" type="p" />
              </Button>
              <Link link={Routes.PREVIEW + "/" + "blue_ui"}>
                <Button
                  width="100%"
                  height="auto"
                  type="white"
                  center
                  onClick={() => navigate(`${Routes.PREVIEW}/${"blue_ui.mcpack"}`)}
                >
                  <BedrockText color="black" text="Preview" type="p" />
                </Button>
              </Link>
            </ButtonGroup>
          }
        />
      </div>
    </div>
  );
};
