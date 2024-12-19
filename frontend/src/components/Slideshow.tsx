import React, { Children, useEffect, useState } from "react";
import "./Slideshow.css"; // Assuming CSS is in a separate file

interface SlideshowProps {
  children: React.ReactNode;
}

const Slideshow: React.FC<SlideshowProps> = ({ children }) => {
  // const items = Children.count(children);
  const items = Children.toArray(children);
  console.log(items[0])

  // console.log([items])
  // const items = ["Div #1", "Div #2", "Div #3"];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      //   if (activeIndex % (items.length + 1) === 3) {
      //     setActiveIndex((prevIndex) => prevIndex++);
      //   }

      setActiveIndex((prevIndex) => {
        console.log("Interval log: ", prevIndex % items.length);
        // let skipFirstOne = false;
        // if(prevIndex % (items.length) === 3) {
        //     skipFirstOne = true;
        // }
        return prevIndex + 1;
      });
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const getTranslateValue = () => {
    return `translateX(-${
      (activeIndex % items.length) * (100 / items.length)
    }%)`;
  };

  console.log(activeIndex % (items.length + 1));

  return (
    <div className="slideshow">
      <div
        className="slideshow-container"
        style={{
          transform: getTranslateValue(),
          width: `calc(100% * ${items.length})`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {items.map((item, index) => (
          <div className="slide" key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className="slideshow-controller">
        {items.map((item, index) => (
          <div
            className={`slideshow-box${
              index === activeIndex % items.length ? " selected" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
