import React, { useState, useRef, ReactNode } from 'react';
import './TestEnvironment.css';

interface ResizableDivProps {
  children?: ReactNode;
}

const ResizableDiv: React.FC<ResizableDivProps> = ({ children }) => {
  const [width, setWidth] = useState(300);  // Initial width of the div
  const [height, setHeight] = useState(300);  // Initial height of the div
  const resizableRef = useRef<HTMLDivElement>(null);

  const onResize = (e: React.MouseEvent) => {
    const resizable = resizableRef.current;
    if (resizable) {
      const newWidth = e.clientX - resizable.getBoundingClientRect().left;
      const newHeight = e.clientY - resizable.getBoundingClientRect().top;
      setWidth(newWidth);
      setHeight(newHeight);
    }
  };

  return (
    <div
      className="resizable-div"
      ref={resizableRef}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {children}
      <div className="resizer" onMouseDown={(e) => e.preventDefault()} onMouseMove={onResize} />
    </div>
  );
};

export default ResizableDiv;
