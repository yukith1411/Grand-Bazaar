import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, color = '#ffa502' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color }}>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <span key={index}>
            {value >= index ? (
              <FaStar />
            ) : value >= index - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
