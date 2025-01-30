import { useEffect, useState } from "react";
import { BedrockText } from "../components/bedrock/text/bedrock-text";
import { Button } from "../components/bedrock/button/button";
import "./AndroidClient.css";
import BedrockBackground from "../assets/images/bedrock-background.webp";
import SimpleButton from "../components/bedrock/simple-button/simple-button";

const AndroidClient: React.FC = () => {
  // State to track whether the menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if the user is on Windows
    const userAgent = navigator.userAgent;
    console.log("useragent: ", userAgent);
    if (userAgent.includes("Windows")) {
      document.body.style.backgroundImage = `url('${BedrockBackground}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";
    }

    // Cleanup effect to reset the background when the component unmounts
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundColor = "transparent";
    };
  }, []);

  const handleMenu = (action: boolean) => {
    // Delay menu opening by 100ms
    setIsMenuOpen(action);
  };

  const sendDataToJava = () => {
    let data = "Sent from React!";
    console.log("Sending data: ", data);
    // if (window.Android) {
    //   window.Android.showToast("Hello from React!");
    // } else {
    //   console.error("Android interface not available");
    // }
  };

  return (
    <div>
      {!isMenuOpen && (
        <div className="client-menu-button">
          <Button
            text="Menu"
            type="alwaysGreen"
            width={"150px"}
            height={"58px"}
            playSound={true}
            onTap={() => handleMenu(true)} // Open the menu on button click
          />
        </div>
      )}

      {isMenuOpen && (
        <div className="client">
          <div className="client-menu">
            <Button
              text="Send Data"
              type="alwaysGreen"
              width={"200px"}
              height={"48px"}
              playSound={true}
              onTap={sendDataToJava}
            ></Button>
          </div>
        </div>
      )}

      <div className="client-info">
        <BedrockText
          text="Better Bedrock Client V1.0"
          type={"p2"}
          font="MinecraftFive"
          textAlign="center"
          color="white"
        />
      </div>
    </div>
  );
};

export default AndroidClient;
