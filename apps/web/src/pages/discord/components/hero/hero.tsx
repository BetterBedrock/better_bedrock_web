import React from "react";
import { BedrockText } from "~/components/bedrock/text";
import { Button } from "~/components/bedrock/button";

export const Hero = () => {
  return (
    <main>
      <BedrockText type={"h1"} text="Discord Redirect" color="white" font="MinecraftTen" />
      <BedrockText
        type="p"
        color="white"
        text={
          "If you were not automatically redirected, click button below to join our discord server."
        }
      />
      <Button
        text="Join Discord"
        width="100%"
        height="auto"
        type="alwaysGreen"
        style={{ paddingTop: "1rem" }}
        onTap={() => window.open("https://discord.gg/ZGK5WYXnEY", "_blank", "noopener,noreferrer")}
      />
    </main>
  );
};
