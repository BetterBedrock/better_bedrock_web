import React from "react";
import { useNavigate } from "react-router-dom";
import { BedrockText } from "~/components/bedrock/bedrock-text";
import { Button } from "~/components/bedrock/button";
import { Routes } from "~/utils/routes";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <main>
      <BedrockText type="h1" text="CHECKOUT CANCELLED" color="white" font="MinecraftTen" />
      <BedrockText
        type="p"
        color="white"
        text={
          "You have cancelled your checkout. If you have any questions or need assistance, please reach out to us."
        }
      />
      <Button
        text="Return to Home"
        width="100%"
        height="auto"
        type="alwaysGreen"
        style={{ paddingTop: "1rem" }}
        onTap={() => {
          navigate(Routes.HOME)
        }}
      />
    </main>
  );
};
