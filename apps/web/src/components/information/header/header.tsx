import React from "react";
import { BedrockText } from "~/components/bedrock/text";
import { Button } from "~/components/bedrock/button";
import styles from "./header.module.css";
import { ButtonSeparator } from "~/components/bedrock/button-separator";

interface HeaderProps {
  tabNames: string[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ tabNames, activeTab, setActiveTab }) => {

  return (
    <div className={styles.tabsContainer}>
      <div>
        <BedrockText
          type={"h1"}
          text={"Information"}
          color="white"
          font="MinecraftTen"
        />
        <BedrockText
          type={"p"}
          color="white"
          margin="0 0 1rem 0"
          text={
            "You can find there the most common problems or questions and answers. Additionally there are tutorial videos based on selected navigation button. We hope everything you want to know is here! If not please contact us through discord."
          }
        />
      </div>
      <div className={styles.tabsWrapper}>
        <ButtonSeparator>
          {tabNames.map((text, index) => (
            <Button
              key={index}
              tabIndex={index}
              isClicked={activeTab === index}
              onTap={() => setActiveTab(index)}
              width={"100%"}
              height={"auto"}
              text={text}
              type={"alwaysGreen"}
            />
          ))}
        </ButtonSeparator>
      </div>
    </div>
  );
};