import { useState } from "react";
import { Button } from "~/components/bedrock/button";
import { ButtonSeparator } from "~/components/bedrock/button-separator";
import { BedrockText } from "~/components/bedrock/text";
import { CommunityConfigs, CommunityThemes } from "~/pages/downloads/components/community";
import { COMMUNITY_TAB_NAMES } from "~/pages/downloads/downloads-data";

export const Community = () => {
  const [communityTab, setCommunityTab] = useState(0);

  return (
    <>
      <div>
        <BedrockText
          type="h1"
          text="Community Creations"
          color="white"
          font="MinecraftTen"
          textAlign="center"
        />
        <BedrockText
          type="p"
          textAlign="center"
          color="white"
          margin="0 0 1rem 0"
          text="Explore a variety of themes and configs made by the community of Better Bedrock users."
        />
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <ButtonSeparator>
          {COMMUNITY_TAB_NAMES.map((text, index) => (
            <Button
              key={index}
              tabIndex={index}
              isClicked={communityTab === index}
              onTap={() => setCommunityTab(index)}
              width={"100%"}
              height={"auto"}
              text={text}
              type={"alwaysBlack"}
            />
          ))}
        </ButtonSeparator>
      </div>
      {communityTab === 0 && <CommunityThemes />}
      {communityTab === 1 && <CommunityConfigs />}
    </>
  );
};
