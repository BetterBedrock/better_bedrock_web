import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/bedrock/Header";
import ResizableDiv from "./components/bedrock/TestEnvironment";
import SimpleButton from "./components/bedrock/SimpleButton";
import { BedrockText, BedrockTextType } from "./components/bedrock/BedrockText";
import Footer from "./components/bedrock/Footer";
import Collapsible from "./components/bedrock/Collapsible";
import { Button, ButtonType } from "./components/bedrock/Button";
import LoadingBar from "./components/bedrock/LoadingBar";
import CircularProgressIndicator from "./components/bedrock/CircularProgressIndicator";
import CreatorCard from "./components/bedrock/CreatorCard";

function App() {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prevPercentage) => {
        if (prevPercentage >= 100) {
          return 0;
        }
        return prevPercentage + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
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
                type={BedrockTextType.p}
                text="Hello"
                font="Mojangles"
              />
            </SimpleButton>
          }
        />
      </header>
      <ResizableDiv>
        {/*
          
          TEXTS
          
          */}
        <br />
        <BedrockText
          type={BedrockTextType.h1}
          font="Minecraft"
          text="Texts"
        ></BedrockText>
        <BedrockText
          type={BedrockTextType.p}
          text="This is a paragraph text."
        />
        <BedrockText
          type={BedrockTextType.h3}
          text="This is a Heading 3 text."
        />
        <BedrockText
          type={BedrockTextType.h2}
          text="This is a Heading 2 text."
        />
        <BedrockText
          type={BedrockTextType.h1}
          text="This is a Heading 1 text."
        />

        {/*
          
          PROGRESS INDICATORS
          
          */}
        <br />
        <BedrockText
          type={BedrockTextType.h1}
          font="Minecraft"
          text="Progress Indicators"
        ></BedrockText>

        <div>
          <br></br>
          <LoadingBar
            maxWidth="100%"
            height="1.5rem"
            percentage={percentage}
          ></LoadingBar>
          <BedrockText
            type={BedrockTextType.p}
            color={"white"}
            text={percentage.toString() + "%"}
          ></BedrockText>
          <CircularProgressIndicator
            height="50px"
            width="50px"
          ></CircularProgressIndicator>
        </div>

        {/*
          
          BUTTONS
          
          */}
        <br />
        <BedrockText
          type={BedrockTextType.h1}
          font="Minecraft"
          text="BUTTONS"
        ></BedrockText>

        <SimpleButton height="43px">
          <BedrockText
            selectable={false}
            type={BedrockTextType.p}
            text="Witaj"
          />
        </SimpleButton>

        <div style={{ height: "5px" }}></div>

        <Collapsible height={"4rem"} width={"450px"}>
          <BedrockText
            selectable={false}
            type={BedrockTextType.p}
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
        ></Button>
        <div style={{ height: "5px" }}></div>
        <Button
          type={ButtonType.alwaysWhite}
          height={"4rem"}
          width={"248px"}
          toggleButton={true}
        ></Button>
        <div style={{ height: "5px" }}></div>
        <Button
          type={ButtonType.alwaysGreen}
          height={"4rem"}
          width={"248px"}
          toggleButton={true}
        ></Button>
        <div style={{ height: "5px" }}></div>
        <Button
          type={ButtonType.alwaysBlack}
          height={"4rem"}
          width={"248px"}
          toggleButton={true}
        ></Button>
        <div style={{ height: "5px" }}></div>

        {/*
          
          Creator Card
          
          */}
        <br />
        <BedrockText
          type={BedrockTextType.h1}
          font="Minecraft"
          text="Creator Card"
        ></BedrockText>

        <CreatorCard></CreatorCard>

        {/*
          
          LABEL USE, e.g.: Footer
          
          */}
        <br />
        <BedrockText
          type={BedrockTextType.h1}
          font="Minecraft"
          text="LABELS"
        ></BedrockText>

        <Footer width="100%" height="58px"></Footer>
      </ResizableDiv>
    </div>
  );
}

export default App;
