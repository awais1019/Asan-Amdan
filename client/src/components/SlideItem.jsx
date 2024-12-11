import React from 'react';
import '../styles/Slider.css';

const SlideItem = ({ imageUrl, title, description, isActive }) => {
  return (
    <div
      className={`slide-item ${isActive ? 'active' : ''}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {isActive && (
        <div className="slide-content">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default SlideItem;
