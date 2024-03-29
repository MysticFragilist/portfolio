import React, { useEffect, useState } from "react";
import { animated, useSpring } from 'react-spring';

const Boop = ({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0, 
  timing = 150, 
  children 
}) => {
  const [isBooped, setIsBooped] = useState(false);

  const style = useSpring({
    display: 'inline-block',
    backfaceVisibility: 'hidden',
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: {
      tension: 300,
      friction: 15,
    },
  });

  React.useEffect(() => {
    if (!isBooped) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);
  const trigger = () => {
    setIsBooped(true);
  };
  return (
    <animated.span onMouseEnter={trigger} style={style}>
      {children}
    </animated.span>
  );
};

export default Boop;