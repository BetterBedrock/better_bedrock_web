import React from "react";
import "./App.css";
import Header from "./components/bedrock/Header";
import ResizableDiv from "./components/bedrock/TestEnvironment";
import SimpleButton from "./components/bedrock/SimpleButton";
import BedrockText from "./components/bedrock/BedrockText";
import Footer from "./components/bedrock/Footer";
import Collapsible from "./components/bedrock/Collapsible";
import { Button, ButtonType } from "./components/bedrock/Button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header
          text="Test Environment"
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
        <p>Some content inside the resizable div.</p>
        <Footer width="100%" height="58px"></Footer>
        <br />
        <Collapsible height={"48px"} width={"650px"} isOpen={true}></Collapsible>
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
