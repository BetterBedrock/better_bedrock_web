import { useState } from "react";
import { Button } from "~/components/bedrock/button";
import { ButtonSeparator } from "~/components/bedrock/button-separator";
import { CommunityThemes } from "~/pages/downloads/community/community-themes";
import { COMMUNITY_TAB_NAMES } from "~/pages/downloads/downloads-data";

export const DownloadsCommunity = () => {
  const [communityTab, setCommunityTab] = useState(0);
  
  return (
    <>
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
      {communityTab === 0 && (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "row", padding: "1rem 0 2rem 0" }}
        >
          <ButtonSeparator
          // style={{justifyContent: "flex-end"}}
          >
            <Button text={"Submit YOUR custom theme"} type="alwaysGreen" width={"auto"} />
            <Button
              text="Watch theme creation tutorial"
              width={"auto"}
              type="alwaysWhite"
              onTap={() =>
                window.open("https://youtu.be/GRQahMrdEoY", "_blank", "noopener,noreferrer")
              }
            />
          </ButtonSeparator>
        </div>
      )}
      <CommunityThemes />
    </>
  );
};
