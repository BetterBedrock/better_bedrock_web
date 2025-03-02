import { BedrockText } from "../../bedrock/text/bedrock-text";

export const CreatorsHeader = () => (
  <>
    <BedrockText
      text="CREATORS"
      type={"h1"}
      font="MinecraftTen"
      color="white"
    ></BedrockText>
    <BedrockText
      type={"p"}
      textAlign="center"
      color="white"
      margin="2.5px 0px 15px 0px"
      text="Meet the creators behind the Better Bedrock project! Initially created by AmBro, then extended by iDarkQ. See below the parts of the project they are responsible for!"
    ></BedrockText>
  </>
);
