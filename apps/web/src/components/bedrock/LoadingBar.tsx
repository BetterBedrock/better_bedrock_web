import "./LoadingBar.css";

interface LoadingBarProps {
  maxWidth: string;
  height: string;
  percentage: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ maxWidth, height, percentage }) => {
  return (
    <div className="loadingbar-outer-layer" style={{ width: maxWidth, height: height }}>
      <div className="loadingbar-inner-layer" style={{ width: `${percentage}%` }} />
    </div>
  );
};

export default LoadingBar;
