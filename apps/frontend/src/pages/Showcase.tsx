import { useState, useEffect, ReactNode } from "react";
import SimpleButton from "../components/bedrock/simple-button/simple-button";
import { BedrockText } from "../components/bedrock/text/bedrock-text";
import Footer from ".././components/bedrock/Footer";
import Collapsible from ".././components/bedrock/Collapsible";
import { Button } from "../components/bedrock/button/button";
import LoadingBar from ".././components/bedrock/LoadingBar";
import CircularProgressIndicator from ".././components/bedrock/CircularProgressIndicator";
import { CreatorCard } from "../components/bedrock/creators-card/creators-card";
import { useNavigate } from "react-router-dom";
import { HeroHeader } from "components/home/hero/hero-header";
import { Navbar } from "components/bedrock/navbar";
import DownloadCard from "components/bedrock/download-card/download-card";

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
  // return (
  //   <div
  //     className="App"
  //     style={{
  //       backgroundColor: "white",
  //       height: "100vh",
  //     }}
  //   >
  //     {/* content */}
  //     <div
  //       style={{
  //         height: "100%",
  //         width: "55%",
  //         display: "flex",
  //         justifyContent: "center",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         marginLeft: "auto",
  //         marginRight: "auto",
  //       }}
  //     >
  //       <LoadingBar
  //         maxWidth="100%"
  //         height="1.5rem"
  //         percentage={percentage}
  //       ></LoadingBar>
  //       <BedrockText
  //         type={"h1"}
  //         color={"white"}
  //         text={percentage.toString() + "%"}
  //       ></BedrockText>
  //       <CircularProgressIndicator
  //         height="50px"
  //         width="50px"
  //       ></CircularProgressIndicator>
  //     </div>
  //   </div>
  // );

  return (
    <div
      className="App"
      style={{
        backgroundColor: "var(--white)",
        height: "100vh",
      }}
    >
      {/* content */}
      <div
        style={{
          height: "80vh",
          maxHeight: "90vh",
          width: "80vw",
          maxWidth: "96vw",
          resize: "both",
          overflow: "auto",
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: "var(--dirty-white)",
          fontFamily: "Mojangles",
        }}
      >
        <LineBreak text="Texts">
          <BedrockText type={"p2"} text="This is a Paragraph 2 text." />
          <BedrockText type={"p"} text="This is a Paragraph 1 text." />
          <BedrockText type={"h3"} text="This is a Heading 3 text." />
          <BedrockText type={"h2"} text="This is a Heading 2 text." />
          <BedrockText type={"h1"} text="This is a Heading 1 text." />
        </LineBreak>

        <LineBreak text="Progress Indicators">
          <LoadingBar
            maxWidth="100%"
            height="1.5rem"
            percentage={percentage}
          ></LoadingBar>
          <BedrockText
            type={"h1"}
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
            <BedrockText selectable={false} type={"p"} text="Example Button" />
          </SimpleButton>

          <div style={{ height: "5px" }}></div>

          <Collapsible height={"4rem"} width={"100%"}>
            <BedrockText selectable={false} type={"p"} text="Witaj!" />
          </Collapsible>
          <div style={{ height: "5px" }}></div>
          <Collapsible height={"4rem"} width={"100%"}></Collapsible>
          <div style={{ height: "5px" }}></div>
          <Collapsible height={"4rem"} width={"100%"}></Collapsible>
          <div style={{ height: "5px" }}></div>
          <Button
            type="alwaysWhite"
            height={"4rem"}
            width={"248px"}
            text="Longer text"
          ></Button>
          <div style={{ height: "5px" }}></div>
          <Button
            type="alwaysGreen"
            height={"4rem"}
            width={"248px"}
            text="Large text right here"
          ></Button>
          <div style={{ height: "5px" }}></div>
          <Button
            type="alwaysBlack"
            height={"4rem"}
            width={"248px"}
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
            type="alwaysBlack"
            height={"4rem"}
            width={"248px"}
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

function LineBreak({
  text,
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginBottom: "4rem",
      }}
    >
      <h1
        style={{
          textAlign: "left",
          backgroundColor: "var(--slider-active)",
        }}
      >
        {text}
      </h1>

      {children ? (
        <div
          style={{
            border: "var(--slider-active) dotted 1px",
            paddingTop: "1rem",
            padding: "0.5rem",
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default Showcase;
