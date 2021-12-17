import React from "react";
import styles from '../styles/sidebar.module.css';
import { useState, useEffect} from 'react';


export const UseWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width:
           window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    } else {
      return;
    }
  }, []);
  return windowSize;
};


export const Sidebar = ({children }) => {
  var { width, height } = UseWindowSize();
  width = 200;
  height  -= 40;

  const [xPosition, setX] = React.useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  React.useEffect(() => {
    setX(0);
  }, []);
  return (
    <React.Fragment>
      <div
        className={styles.sidebar}
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height
        }}
      >
        <button
          onClick={() => toggleMenu()}
          className={styles.togglemenu}
          style={{
            transform: `translate(${width}px, 20vh)`
          }}
        ></button>
        <div className={styles.content}>{children}</div>
      </div>
    </React.Fragment>
  );
};


export default Sidebar;