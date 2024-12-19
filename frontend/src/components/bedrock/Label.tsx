import React from "react";
import "./Label.css";

interface LabelProps {
  children?: React.ReactNode;
  height?: string;
  width: string;
  minHeight?: string;
}

const Label: React.FC<LabelProps> = ({ children, width, height, minHeight }) => {
  return (
    <div className="outer-div" style={{ width: width, height: height, minHeight: minHeight}}>
      <div className="inner-div">
        {children}
      </div>
    </div>
  );
};

export default Label;
