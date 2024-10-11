import React from "react";
import "./Label.css";

interface LabelProps {
  children: React.ReactNode;
  height: string;
  width: string;
  rotated: boolean | undefined,
}

const Label: React.FC<LabelProps> = ({ children, width, height }) => {
  return (
    <div className="outer-div" style={{ width: width, height: height }}>
      <div className="inner-div">
        {children}
      </div>
    </div>
  );
};

export default Label;
