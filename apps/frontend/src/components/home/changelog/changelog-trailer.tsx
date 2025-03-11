import { BedrockText } from "components/bedrock/text";
import styles from "./changelog.module.css";
import { ButtonSeparator } from "components/bedrock/button-separator";
import { Button } from "components/bedrock/button";
import { useNavigate } from "react-router-dom";

export const ChangelogTrailer = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>

      <div className={styles.videoContainer}>
        <BedrockText
          type={"h1"}
          color="white"
          text="Latest changelog video"
          font="MinecraftTen"
        />
        <BedrockText
          type={"p"}
          color="white"
          text="Watch Better Bedrock v7.2 Changelog Showcase"
        />
        <div className={styles.videoIframeContainer}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Oz2cnztzSMw" title="Better Bedrock Changelog v7.2 #1 | Client release on windows! | New Texture Pack version | Showcase" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>

      <div>
        <BedrockText
          type={"h1"}
          color="white"
          text="More information"
          font="MinecraftTen"
        />
        <BedrockText
          type={"p"}
          color="white"
          text="Check FAQ and tutorial videos in information page or directly join discord for latest news or check news history!"
        />
        <ButtonSeparator style={{ paddingTop: "1rem" }}>
          <Button
            text="Information Page"
            width={"100%"}
            height={"auto"}
            type="alwaysGreen"
            onTap={() => { navigate("/information") }}
          />
          <Button
            text="Join Discord"
            width={"100%"}
            height={"auto"}
            type="alwaysWhite"
            onTap={() => window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer")}
          />
        </ButtonSeparator>
      </div>
    </div>
  )
};
