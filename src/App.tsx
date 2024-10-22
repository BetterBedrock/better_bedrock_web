import React from "react";
import "./App.css";
import Header from "./components/bedrock/Header";
import ResizableDiv from "./components/bedrock/TestEnvironment";
import SimpleButton from "./components/bedrock/SimpleButton";
import BedrockText from "./components/bedrock/BedrockText";
import Footer from "./components/bedrock/Footer";
import Collapsible from "./components/bedrock/Collapsible";

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
        <Collapsible height={"48px"} width={"450px"}>
          <BedrockText text="Witaj!" />
        </Collapsible>
      </ResizableDiv>
    </div>
  );
}

export default App;
