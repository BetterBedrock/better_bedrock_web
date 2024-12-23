import React, { useState, useEffect, ReactNode } from "react";
import Header from ".././components/bedrock/Header";
import ResizableDiv from ".././components/bedrock/TestEnvironment";
import SimpleButton from ".././components/bedrock/SimpleButton";
import {
  BedrockText,
  BedrockTextType,
} from ".././components/bedrock/BedrockText";
import Footer from ".././components/bedrock/Footer";
import Collapsible from ".././components/bedrock/Collapsible";
import { Button, ButtonType } from ".././components/bedrock/Button";
import LoadingBar from ".././components/bedrock/LoadingBar";
import CircularProgressIndicator from ".././components/bedrock/CircularProgressIndicator";
import CreatorCard from ".././components/bedrock/CreatorCard";
import { useNavigate } from "react-router-dom";
import DownloadCard from "../components/bedrock/DownloadCard";

function Showcase() {
  const [percentage, setPercentage] = useState(0);

  const navigate = useNavigate(); // Hook to navigate programmatically

  const navigateAndroidClient = () => {
    navigate("/client"); // Programmatically navigate to the /about route
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prevPercentage) => {
        if (prevPercentage >= 100) {
          return 0;
        }
        return prevPercentage + 1;
      });
    }, 3000); // 30 -> 1000 pali kompa xd - rerenderuje caly ten return nizej

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App" style={{
      backgroundColor: "gray",
      height: "100vh",
    }}>
      <header>
        <Header
          text={
            percentage < 50 ? `Test Environment, ${percentage}` : `Siema Siema`
          }
          width="100%"
          height="4rem"
          suffix={
            <SimpleButton height="1rem">
              <BedrockText
                selectable={false}
                type={BedrockTextType.p2}
                text="Hello"
                font="Mojangles"
              />
            </SimpleButton>
          }
        />
      </header>

      {/* content */}
      <div style={{
        height: "80vh",
        maxHeight: "90vh",
        width: "80vw",
        maxWidth: "96vw",
        resize: "both",
        overflow: "auto",
        paddingLeft: 20,
        paddingRight: 20
      }}>
        <LineBreak text="Texts">
          <BedrockText
            type={BedrockTextType.p3}
            text="This is a Paragraph 3 text."
          />
          <BedrockText
            type={BedrockTextType.p2}
            text="This is a Paragraph 2 text."
          />
          <BedrockText
            type={BedrockTextType.p1}
            text="This is a Paragraph 1 text."
          />
          <BedrockText type={BedrockTextType.h3} text="This is a Heading 3 text." />
          <BedrockText type={BedrockTextType.h2} text="This is a Heading 2 text." />
          <BedrockText type={BedrockTextType.h1} text="This is a Heading 1 text." />
        </LineBreak>

        <LineBreak text="Progress Indicators">
          <LoadingBar
            maxWidth="100%"
            height="1.5rem"
            percentage={percentage}
          ></LoadingBar>
          <BedrockText
            type={BedrockTextType.h1}
            color={"white"}
            text={percentage.toString() + "%"}
          ></BedrockText>
          <CircularProgressIndicator
            height="50px"
            width="50px"
          ></CircularProgressIndicator>
        </LineBreak>

        <LineBreak text="Buttons">
          <SimpleButton height="43px">
            <BedrockText
              selectable={false}
              type={BedrockTextType.p1}
              text="Witaj"
            />
          </SimpleButton>

          <div style={{ height: "5px" }}></div>

          <Collapsible height={"4rem"} width={"450px"}>
            <BedrockText
              selectable={false}
              type={BedrockTextType.p1}
              text="Witaj!"
            />
          </Collapsible>
          <div style={{ height: "5px" }}></div>
          <Collapsible height={"4rem"} width={"650px"}></Collapsible>
          <div style={{ height: "5px" }}></div>
          <Collapsible height={"4rem"} width={"650px"}></Collapsible>
          <div style={{ height: "5px" }}></div>
          <Button
            type={ButtonType.default}
            height={"4rem"}
            width={"248px"}
            toggleButton={true}
            text="Short"
          ></Button>
          <div style={{ height: "5px" }}></div>
          <Button
            type={ButtonType.alwaysWhite}
            height={"4rem"}
            width={"248px"}
            toggleButton={true}
            text="Longer text"
          ></Button>
          <div style={{ height: "5px" }}></div>
          <Button
            type={ButtonType.alwaysGreen}
            height={"4rem"}
            width={"248px"}
            toggleButton={true}
            text="Large text right here"
          ></Button>
          <div style={{ height: "5px" }}></div>
          <Button
            type={ButtonType.alwaysBlack}
            height={"4rem"}
            width={"248px"}
            toggleButton={true}
            text="This should not fit in the button."
          ></Button>
          <div style={{ height: "5px" }}></div>
        </LineBreak>

        <LineBreak text="Creator Card">
          <CreatorCard
            width="100%"
            height="100px"
            name="iDarkQ"
            description={["Hello world!", " Hee"]}
          ></CreatorCard>
        </LineBreak>

        <LineBreak text="Download Card">
          <DownloadCard
            title="Texture Pack v7.4"
            description="The Better Bedrock Texture Pack is a powerful, customizable, and free Texture Pack available on most platforms. Enhance your gameplay with multiple mods and adjustable options!"
            downloadSize="1.2 MB"
          ></DownloadCard>
        </LineBreak>

        <LineBreak text="Pages">
          <Button
            type={ButtonType.alwaysBlack}
            height={"4rem"}
            width={"248px"}
            toggleButton={true}
            text="Android Page"
            onTap={() => {
              navigateAndroidClient();
            }}
          ></Button>
        </LineBreak>

        <LineBreak text="Labels">
          <Footer width="100%"></Footer>
        </LineBreak>
      </div>

    </div>
  );
}

function LineBreak({ text, children }: { text: string, children?: React.ReactNode }) {
  return (
    <div style={{
      marginBottom: "4rem",}}>
      <h1 style={{
        textAlign: "left",
        backgroundColor: "red",
      }}>{text}</h1>

      {children ? <div style={{
        border: "red dotted 1px",
        paddingTop: "1rem",
        padding: "0.5rem"
      }}>
        {children}
      </div> : null}

    </div>
  );
}

export default Showcase;