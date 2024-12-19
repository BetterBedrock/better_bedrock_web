import React from "react";
import "./LoadingBar.css";

interface LoadingBarProps {
    maxWidth: string;
    height: string;
    percentage: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({maxWidth, height,percentage}) => {
  return (
    <div className="loadingbar-outer-layer" style={{maxWidth: maxWidth, height: height,}}>
        <div className="loadingbar-inner-layer" style={{width: `${percentage}%`}}>

        </div>
    </div>
  )
};

export default LoadingBar;