import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/bedrock/Header";
import ResizableDiv from "./components/bedrock/TestEnvironment";
import SimpleButton from "./components/bedrock/SimpleButton";
import BedrockText from "./components/bedrock/BedrockText";
import Footer from "./components/bedrock/Footer";
import Collapsible from "./components/bedrock/Collapsible";
import { Button, ButtonType } from "./components/bedrock/Button";
import LoadingBar from "./components/bedrock/LoadingBar";

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
      <header className="App-header">
        <Header
          text={percentage < 50 ? `Test Environment, ${percentage}` : `Siema Siema`}
          width="100%"
          height="58px"
          suffix={
            <SimpleButton height="43px">
              <BedrockText text="Hello" font="Mojangles" />
            </SimpleButton>
          }
        />
      </header>
      <ResizableDiv>
        <SimpleButton height="43px">
          <BedrockText text="Witaj" />
        </SimpleButton>

        {/* LoadingBar that updates based on the state */}
        <div>
          <br></br>
          <LoadingBar
            maxWidth="100%"
            height="18px"
            percentage={percentage}
          ></LoadingBar>
          <BedrockText color={"white"} text={percentage.toString() + "%"}></BedrockText>
        </div>
        <p>Some content inside the resizable div.</p>
        <Footer width="100%" height="58px"></Footer>
        <Collapsible height={"48px"} width={"450px"}>
          <BedrockText text="Witaj!" />
        </Collapsible>
        <br />
        <Collapsible height={"48px"} width={"650px"}></Collapsible>
        <br />
        <Collapsible height={"48px"} width={"650px"}></Collapsible>
        <br />
        <Button
          type={ButtonType.default}
          height={"48px"}
          width={"248px"}
          toggleButton={true}
        ></Button>
        <br />
        <Button
          type={ButtonType.alwaysWhite}
          height={"48px"}
          width={"248px"}
          toggleButton={true}
        ></Button>
        <br />
        <Button
          type={ButtonType.alwaysGreen}
          height={"48px"}
          width={"248px"}
          toggleButton={true}
        ></Button>
        <br />
        <Button
          type={ButtonType.alwaysBlack}
          height={"48px"}
          width={"248px"}
          toggleButton={true}
        ></Button>
      </ResizableDiv>
    </div>
  );
}

export default App;
