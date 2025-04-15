

import { useState, useEffect, useRef } from "react";
import './BottomNavigation.css'
const BottomNavigation = ({ items, setActive, activeItem }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef(null);

  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    if (item?.handler) {
      item.handler();
    }
  };

  useEffect(() => {
    const navElement = navRef.current;
    if (navElement) {
      const listItems = navElement.querySelectorAll("li");
      if (listItems.length > 0) {
        const itemWidth = listItems[0].clientWidth; // Get width of one list item
        document.documentElement.style.setProperty("--indicator-width", `${itemWidth}px`);
        document.documentElement.style.setProperty("--indicator-position", `${activeIndex * itemWidth}px`);
      }
    }
  }, [activeIndex]);

  return (
    <div className="navigation container p-0" ref={navRef}>
      <ul className="nav flex-row w-100 justify-content-around align-items-center mb-0">
        {items.map((item, index) => (
          <li
            key={index}
            className={`list ${activeItem === item.content || index === activeIndex ? "active" : ""}`}
            onClick={() => {
              setActive(item.content);
              handleItemClick(index, item);
            }}
          >
            <a className="nav-link text-center d-flex flex-column align-items-center">
              <span className="icon">
                <span className="ion-icon">{item.icon}</span>
              </span>
              <span className="text">{item.text}</span>
            </a>
          </li>
        ))}
        <div className="indicator"></div>
      </ul>
    </div>
  );
};

export default BottomNavigation;
