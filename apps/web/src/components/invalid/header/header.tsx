import React from "react";
import { BedrockText } from "~/components/bedrock/text";
import { Button } from "~/components/bedrock/button";
import styles from "./header.module.css";
import { ButtonSeparator } from "~/components/bedrock/button-separator";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div style={{ width: "100%" }}>
        <BedrockText
          type={"h1"}
          text={"Invalid Page"}
          color="white"
          font="MinecraftTen"
        />
        <BedrockText
          type={"p"}
          color="white"
          text={"This path is invalid. Click the buttons below to navigate to the correct paths."}
        />
        <ButtonSeparator style={{ paddingTop: "1rem" }}>
          <Button
            text="Home Page"
            width={"100%"}
            height={"auto"}
            type="alwaysGreen"
            onTap={() => { navigate("/") }}
          />
          <Button
            text="Information Page"
            width={"100%"}
            height={"auto"}
            type="alwaysWhite"
            onTap={() => { navigate("/information") }}
          />
        </ButtonSeparator>
      </div>
    </div>
  );
};
