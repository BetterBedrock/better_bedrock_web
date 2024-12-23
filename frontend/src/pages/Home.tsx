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
import { useNavigate } from "react-router-dom";
import Slideshow from "../components/Slideshow";
import { useMediaQuery } from "react-responsive";

const Home: React.FC = () => {
  const naviagte = useNavigate();
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 500px)",
  });

  const aboutPageElements = [
    <div className="about" key="mod-menu">
      {isSmallScreen ? (
        <></>
      ) : (
        <div className="img-wrapper">
          <img
            alt=""
            src={require("../assets/images/banners/custom_uis.png")}
          ></img>
        </div>
      )}

      <div className="about-content">
        <BedrockText
          text="Mod Menu"
          type={BedrockTextType.h1}
          font="MinecraftTen"
          color="white"
          textAlign="center"
        ></BedrockText>
        <BedrockText
          text="Includes many adjustable modules and options to customize default HUD elements!"
          type={BedrockTextType.p1}
          font="Mojangles"
          color="white"
          textAlign="center"
        ></BedrockText>
      </div>
      {!isSmallScreen ? (
        <></>
      ) : (
        <img
          alt=""
          src={require("../assets/images/banners/mod_menu.png")}
        ></img>
      )}
    </div>,
    <div className="about" key="custom-uis">
      <div className="about-content">
        <BedrockText
          text="Custom UIS"
          type={BedrockTextType.h1}
          font="MinecraftTen"
          color="white"
          textAlign="center"
        ></BedrockText>
        <BedrockText
          text="Most main screens have been rewritten to match new upcoming Minecraft UI, the OreUI."
          type={BedrockTextType.p1}
          font="Mojangles"
          color="white"
          textAlign="center"
        ></BedrockText>
      </div>
      <div className="img-wrapper">
        <img
          alt=""
          src={require("../assets/images/banners/mod_menu.png")}
        ></img>
      </div>
    </div>,
  ];

  return (
    <>
      <header>
        <Header
          text=""
          width="100%"
          height="58px"
          suffix={
            <>
              <li>
                {" "}
                <SimpleButton height={"100%"}
                  onTap={() => naviagte("/")}>
                  <BedrockText
                    text="Home"
                    type={BedrockTextType.p1}
                    textAlign="center"
                  />
                </SimpleButton>{" "}
              </li>
              <li>
                <SimpleButton
                  height={"100%"}
                  onTap={() => naviagte("/download")}
                >
                  <BedrockText
                    text="Download"
                    type={BedrockTextType.p1}
                    textAlign="center"
                  />
                </SimpleButton>
              </li>
              <li>
                <SimpleButton height={"100%"}
                  onTap={() => naviagte("/showcase")}>
                  <BedrockText
                    text="Discord"
                    type={BedrockTextType.p1}
                    textAlign="center"
                  />
                </SimpleButton>
              </li>
              <li>
                <SimpleButton height={"100%"}
                  onTap={() => naviagte("/faq")}>
                  <BedrockText
                    text="FAQ"
                    type={BedrockTextType.p1}
                    textAlign="center"
                  />
                </SimpleButton>
              </li>
            </>
          }
          prefix={
            <>
              <img alt="" src={require("../assets/images/favicon.png")} />
              <BedrockText
                text="Better Bedrock"
                type={BedrockTextType.h1}
                font="MinecraftTen"
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
              <hgroup>
                <BedrockText
                  type={BedrockTextType.h1}
                  text="Better Bedrock"
                  color="white"
                  font="MinecraftTen"
                  margin="calc(var(--minecraftdepth) * 6) 0px 0px 0px"
                  textAlign="center"
                ></BedrockText>
                <BedrockText
                  type={BedrockTextType.p1}
                  textAlign="center"
                  color="white"
                  margin="0px 0px calc(var(--minecraftdepth) * 6)"
                  text="is the most powerful, customizable, useful and free Texture Pack available on the majority of platforms!"
                ></BedrockText>
              </hgroup>
            </div>
            <div className="page-element">
              <div className="buttons">
                <Button
                  font="MinecraftTen"
                  text="Download"
                  width={"100%"}
                  height={"48px"}
                  outlinePaddingRight="1.75px"
                  type={ButtonType.alwaysGreen}
                ></Button>
                <Button
                  text="Discord"
                  width={"100%"}
                  height={"48px"}
                  outlinePaddingLeft="1.75px"
                  type={ButtonType.alwaysWhite}
                ></Button>
              </div>
            </div>
          </div>
        </section>
        <section className="about-betterbedrock">
          <div className="page-content-wrapper">
            {isSmallScreen ? (
              <Slideshow>{aboutPageElements}</Slideshow>
            ) : (
              aboutPageElements
            )}
          </div>
        </section>
        <section className="creators">
          <div className="page-content-wrapper">
            <BedrockText
              text="CREATORS"
              type={BedrockTextType.h1}
              font="MinecraftTen"
              color="white"
            ></BedrockText>
            <BedrockText
              type={BedrockTextType.p1}
              textAlign="center"
              color="white"
              margin="0px 0px 0px"
              text="Meet the creators of this project! Started by simple texture pack by Ambro has evolved into advanced mobile and desktop applications developed by IDarkQ."
            ></BedrockText>
            <div className="creators-wrapper">
              <CreatorCard
                width="auto"
                height="100px"
                name="Ambro"
                description={["Texture Pack", "Discord"]}
              ></CreatorCard>
              <CreatorCard
                width="auto"
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
