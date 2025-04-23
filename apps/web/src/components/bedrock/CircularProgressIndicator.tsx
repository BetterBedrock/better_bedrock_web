
import { ReactComponent as CircularProgressIndicatorSVG } from '~/assets/svgs/circularProgressIndicator.svg';
import "./CircularProgressIndicator.css";

interface CircularProgressIndicatorProp {
  width: string,
  height: string,
}

const CircularProgressIndicator: React.FC<
  CircularProgressIndicatorProp
> = ({width, height}) => {

  return (
    <div className="circularProgressIndicator" style={{width: width, height: height}}>
      <CircularProgressIndicatorSVG className="circularProgressIndicator-child"/>
    </div>
  );
};

export default CircularProgressIndicator;
