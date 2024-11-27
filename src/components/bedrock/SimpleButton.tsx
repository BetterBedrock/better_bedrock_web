import React, { useState, useEffect, ReactNode } from "react";
import "./SimpleButton.css"; // Import CSS styles
import bedrockClickSound from "../../assets/sounds/minecraft_click.mp3";

// Define prop types for the component
interface SimpleButtonProps {
  height?: number | string;
  width?: number | string;
  children?: ReactNode; // Child can be any React component or element
  onTap?: () => void; // onTap is a function that takes no arguments and returns nothing
  isClicked?: boolean; // Optional prop to force the clicked state
  playSound?: boolean;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({
  height,
  width,
  children,
  onTap,
  isClicked,
  playSound = false,
}) => {
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    if (isClicked !== undefined) {
      setClicked(isClicked);
    }
  }, [isClicked]);

  let audio = new Audio(bedrockClickSound);

  const handleClick = () => {
    if (clicked) return;

    setClicked(true);
    if (playSound) audio.play();
    if (onTap) onTap();

    // Simulate delay to revert button click state
    setTimeout(() => setClicked(false), 100); // Adjust delay as needed
  };

  return (
    <div
      className={`minecraft-button non-selectable ${clicked ? "clicked" : ""}`}
      style={{ height, width }}
      onClick={handleClick}
    >
      <div className="minecraft-button-child">{children}</div>
    </div>
  );
};

export default SimpleButton;
