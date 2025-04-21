import React from "react";
import { BedrockText } from "~/components/bedrock/text";
import { Button } from "~/components/bedrock/button";
import styles from "./header.module.css";

export const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <div style={{ width: "100%" }}>
        <BedrockText
          type={"h1"}
          text={"Discord Redirect"}
          color="white"
          font="MinecraftTen"
        />
        <BedrockText
          type={"p"}
          color="white"
          text={"If you were not automatically redirected, click button below to join our discord server."}
        />
        <Button
          text="Join Discord"
          width={"100%"}
          height={"auto"}
          type="alwaysGreen"
          style={{ paddingTop: "1rem" }}
          onTap={() => window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer")}
        />
      </div>
    </div>
  );
};
