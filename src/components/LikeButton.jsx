import React, { useState } from 'react';

const LikeButton = ({hearts, onLike}) => {
  const [isLiked, setIsLiked] = useState(false);
  
  const handleHearts = () => {
    if (isLiked) return;
      setIsLiked(true);
      onLike?.();
  };

  return (
    <div>
      <button
      onClick={handleHearts}
      className={`w-12 h-12 rounded-full mt-4  transition-all duration-300
        ${isLiked ? 'bg-red-200 text-white animate-bounce' : 'bg-gray-200 text-black'}`}
      >
        {isLiked ? '❤️ ' : '🤍'}
      </button>
      <span> x {hearts}</span>
    </div>
  );
};

export default LikeButton;