import { BedrockText } from "~/components/bedrock/bedrock-text";
import { styles } from ".";
import Steve from "~/assets/images/avatars/Steve.png";
// import { Label } from "~/components/bedrock/label";
import { Card } from "~/components/bedrock/card";
import { GridDownloadCard } from "~/components/bedrock/grid-download-card/grid-download-card";
import { baseUrl } from "~/utils/url";
import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { ButtonGroup } from "~/components/button-group/button-group";
import { Link } from "~/components/link";
import { Routes } from "~/utils/routes";

export const User = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Card>
        <div className={styles.profile}>
          <img src={Steve} className={styles.image} />
          <div className={styles.profileInfo}>
            <BedrockText type="h1" text="iDarkQ" color="white" textAlign="left" font="Minecraft" />
            <BedrockText
              type="p"
              text="Lorem ipsum dolor sit amet"
              color="white"
              textAlign="left"
            />
          </div>
        </div>
      </Card>

      <div className={styles.list}>
        <div>
          <BedrockText
            type="h1"
            textAlign="center"
            color="white"
            text="Projects 12 ???"
            font="MinecraftTen"
          />
          {/* <BedrockText
            type="p"
            textAlign="center"
            color="white"
            text="Watch the showcase for more details about our latest Texture Pack!"
          /> */}
        </div>
        <div className={styles.projects}>
          <GridDownloadCard
            // key={item.downloadId}
            title={"Test"}
            tags={["deprected"]}
            description={<BedrockText text={`@iDarkQ`} type={"p"} textAlign="left" color="white" />}
            thumbnail={<img src={`${baseUrl}/static/images/themes/v8/blue_ui/1.png`} alt={""} />}
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
                <Link link={Routes.PREVIEW + "/" + "blue_ui"} className={styles.hide}>
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
    </div>
  );
};
