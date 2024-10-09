import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Slideshow.css";

function Slideshow() {
  const slideData = [
    {
      url: "/images/filler-img.jpeg",
      title: "Your Virtual Closet",
      caption: "All your clothes, at a glance",
      button: "Get Started",
      path: "/upload",
    },
    {
      url: "/images/filler-img.jpeg",
      title: "Plan and Curate",
      caption: "Upload stuff",
      button: "Get Started",
    },
    {
      url: "/images/filler-img.jpeg",
      title: "Receive Suggestions",
      caption: "Using AI",
      button: "Get Started",
    },
    {
      url: "/images/filler-img.jpeg",
      title: "Get Inspired",
      caption: "View other's outfits",
      button: "Get Started",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 5000;

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === slideData.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
      >
        {slideData.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.url})` }}
          >
            <div className="y-centered-inner">
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-caption">{slide.caption}</p>
              <Link to={slide.path} className="btn">{slide.button}</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="slideshowDots">
        {slideData.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${currentIndex === idx ? " active" : ""}`}
            onClick={() => {
              setCurrentIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
