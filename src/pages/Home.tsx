import React from "react";
import Header from "../components/bedrock/Header";
import "./Home.css";
import {
  BedrockText,
  BedrockTextType,
} from "../components/bedrock/BedrockText";
import { Button, ButtonType } from "../components/bedrock/Button";
import SimpleButton from "../components/bedrock/SimpleButton";
import CreatorCard from "../components/bedrock/CreatorCard";
import Footer from "../components/bedrock/Footer";

const Home: React.FC = () => {
  return (
    <>
      <header>
        <Header
          text=""
          width="100%"
          height="58px"
          suffix={
            <>
              <SimpleButton height={"100%"}>
                <BedrockText
                  text="Home"
                  type={BedrockTextType.p1}
                  textAlign="center"
                />
              </SimpleButton>
              <SimpleButton height={"100%"}>
                <BedrockText
                  text="Download"
                  type={BedrockTextType.p1}
                  textAlign="center"
                />
              </SimpleButton>
              <SimpleButton height={"100%"}>
                <BedrockText
                  text="Discord"
                  type={BedrockTextType.p1}
                  textAlign="center"
                />
              </SimpleButton>
              <SimpleButton height={"100%"}>
                <BedrockText
                  text="FAQ"
                  type={BedrockTextType.p1}
                  textAlign="center"
                />
              </SimpleButton>
            </>
          }
          prefix={
            <>
              <img alt="" src={require("../assets/images/favicon.png")} />
              <BedrockText
                text="Better Bedrock"
                type={BedrockTextType.h1}
                font="Minecraft"
              />
            </>
          }
        ></Header>
      </header>
      <main id="home-page-sections">
        <section className="introduction">
          <div className="page-content-wrapper">
            <div className="page-element">
              <img alt="" src={require("../assets/images/logo.png")}></img>
            </div>
            <div className="page-element">
              <BedrockText
                type={BedrockTextType.h1}
                text="Better Bedrock"
                color="white"
                font="Minecraft"
                margin="20px 0px 0px 0px"
              ></BedrockText>
            </div>
            <div className="page-element">
              <BedrockText
                type={BedrockTextType.p1}
                textAlign="center"
                color="white"
                margin="0px 0px 20px"
                text="is the most powerful, customizable, useful and free Texture Pack available on the majority of platforms!"
              ></BedrockText>
            </div>
            <div className="page-element">
              <Button
                text="Download"
                width={"100%"}
                height={"48px"}
                outlinePaddingRight="0px"
                type={ButtonType.alwaysGreen}
              ></Button>
              <Button
                text="Discord"
                width={"100%"}
                height={"48px"}
                type={ButtonType.alwaysWhite}
              ></Button>
            </div>
          </div>
        </section>
        <section className="about-betterbedrock">
          <div className="page-content-wrapper"></div>
        </section>
        <section className="creators">
          <div className="page-content-wrapper">
            <BedrockText
              text="CREATORS"
              type={BedrockTextType.h2}
              font="Minecraft"
              color="white"
            ></BedrockText>
            <div className="creators-wrapper">
              <CreatorCard
                width="50%"
                height="100px"
                name="Ambro"
                description={["Texture Pack", "Discord"]}
              ></CreatorCard>
              <CreatorCard
                width="50%"
                height="100px"
                name="iDarkQ"
                description={[
                  "Mobile App",
                  "Android Client",
                  "Website",
                  "Windows Client",
                ]}
              ></CreatorCard>
            </div>
          </div>
          <Footer width="100%"></Footer>
        </section>
      </main>
    </>
  );
};

export default Home;
