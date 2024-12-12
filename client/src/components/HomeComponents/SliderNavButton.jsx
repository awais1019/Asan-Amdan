import React from 'react';
import "../../Styles/Slider.css";
const SliderNavButton = ({ direction, onClick }) => {
  return (
    <button
      className={`slider-nav-btn ${direction}`}
      onClick={onClick}
      aria-label={`Go to ${direction} slide`}
    >
      {direction === 'prev' ? '←' : '→'}
    </button>
  );
};

export default SliderNavButton;
