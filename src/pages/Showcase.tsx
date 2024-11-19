import React, { useState, useEffect } from "react";
import Header from ".././components/bedrock/Header";
import ResizableDiv from ".././components/bedrock/TestEnvironment";
import SimpleButton from ".././components/bedrock/SimpleButton";
import { BedrockText, BedrockTextType } from ".././components/bedrock/BedrockText";
import Footer from ".././components/bedrock/Footer";
import Collapsible from ".././components/bedrock/Collapsible";
import { Button, ButtonType } from ".././components/bedrock/Button";
import LoadingBar from ".././components/bedrock/LoadingBar";
import CircularProgressIndicator from ".././components/bedrock/CircularProgressIndicator";
import CreatorCard from ".././components/bedrock/CreatorCard";
import { useNavigate } from 'react-router-dom';

function Showcase() {
  const [percentage, setPercentage] = useState(0);

  const navigate = useNavigate(); // Hook to navigate programmatically

  const navigateAndroidClient = () => {
    navigate('/client'); // Programmatically navigate to the /about route
  };

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
                type={BedrockTextType.p2}
                text="Hello"
                font="Mojangles"
              />
            </SimpleButton>
          }
        />
      </header>
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
          type={BedrockTextType.h1}
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
          
          PAGES
          
          */}
      <br />
      <BedrockText
        type={BedrockTextType.h1}
        font="Minecraft"
        text="Pages"
      ></BedrockText>

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
    </div>
  );
}

export default Showcase;
