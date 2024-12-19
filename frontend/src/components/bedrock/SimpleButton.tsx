import React, { useState, useEffect, ReactNode } from "react";
import "./SimpleButton.css"; // Import CSS styles
import { useSound } from "use-sound";
import bedrockClickSound from "../../assets/sounds/minecraft_click.mp3";

// Define prop types for the component
interface SimpleButtonProps {
  height?: number | string;
  width?: number | string;
  children?: ReactNode; // Child can be any React component or element
  onTap?: () => void; // onTap is a function that takes no arguments and returns nothing
  isClicked?: boolean; // Optional prop to force the clicked state
  playSound?: boolean;
  tabIndex?: number;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  height,
  width,
  children,
  onTap,
  isClicked,
  playSound = false,
  tabIndex,
}) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [playClickSound] = useSound(bedrockClickSound);

  useEffect(() => {
    if (isClicked !== undefined) {
      setClicked(isClicked);
    }
  }, [isClicked]);

  const handleClick = () => {
    if (clicked) return;

    setClicked(true);
    if (playSound) playClickSound();
    if (onTap) onTap();

    // Simulate delay to revert button click state
    setTimeout(() => setClicked(false), 100); // Adjust delay as needed
  };

  return (
    <button
      className={`bedrock-simple-button non-selectable ${clicked ? "clicked" : ""}`}
      style={{ height, width }}
      onClick={handleClick}
      tabIndex={tabIndex}
    >
      <div className="bedrock-simple-button-child">{children}</div>
    </button>
  );
};

export default SimpleButton;
