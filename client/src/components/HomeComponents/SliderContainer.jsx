import React, { useState, useEffect } from 'react';
import SlideItem from './SlideItem';
import SliderNavButton from './SliderNavButton';
import "../../Styles/Slider.css";


const SliderContainer = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // 3000ms = 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-container">
      <SliderNavButton direction="prev" onClick={prevSlide} />
      <div
        className="slider"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Slide horizontally
        }}
      >
        {slides.map((slide, index) => (
          <SlideItem
            key={index}
            imageUrl={slide.imageUrl}
            title={slide.title}
            description={slide.description}
            isActive={index === currentIndex}
          />
        ))}
      </div>
      <SliderNavButton direction="next" onClick={nextSlide} />
    </div>
  );
};

export default SliderContainer;
