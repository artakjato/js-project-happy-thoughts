import React, { useState } from 'react';

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
      setLikes(likes + 1);
      setIsLiked(true);
  };

  return (
    <div>
      <button
      onClick={handleLike}
      className={`w-12 h-12 rounded-full mt-4  transition-all duration-300
        ${isLiked ? 'bg-red-200 text-white animate-bounce' : 'bg-gray-200 text-black'}`}
      >
        {isLiked ? '❤️ ' : '🤍'}
      </button>
      <span> x {likes}</span>
    </div>
  );
};

export default LikeButton;