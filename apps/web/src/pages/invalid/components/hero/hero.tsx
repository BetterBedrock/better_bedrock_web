import { useNavigate } from "react-router-dom";
import { Button } from "~/components/bedrock/button";
import { ButtonSeparator } from "~/components/bedrock/button-separator";
import { BedrockText } from "~/components/bedrock/text";
import { Section } from "~/components/section";
import { styles } from ".";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <Section className={styles.background}>
      <div style={{ width: "100%" }}>
        <BedrockText type="h1" text="Error 404" color="white" font="MinecraftTen" />
        <BedrockText
          type="p"
          color="white"
          text="This path is invalid. Click the buttons below to navigate to the correct paths."
        />
        <ButtonSeparator style={{ paddingTop: "1rem" }}>
          <Button
            text="Home Page"
            width="100%"
            height="auto"
            type="alwaysGreen"
            onTap={() => {
              navigate("/");
            }}
          />
          <Button
            text="Information Page"
            width="100%"
            height="auto"
            type="alwaysWhite"
            onTap={() => {
              navigate("/information");
            }}
          />
        </ButtonSeparator>
      </div>
    </Section>
  );
};
