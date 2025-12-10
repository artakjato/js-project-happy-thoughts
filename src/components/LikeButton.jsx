const LikeButton = ({ hearts, onLike, isLiked }) => {
  const handleHearts = () => {
    if (isLiked) return;
    onLike?.();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleHearts}
        className={`w-12 h-12 rounded-full mt-4  transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500
        ${
          isLiked
            ? "bg-red-200 text-white animate-bounce"
            : "bg-gray-200 text-black"
        }`}
        aria-pressed={isLiked}
        aria-label={isLiked ? "You liked this thought" : "Like this thought"}
      >
        {isLiked ? "❤️ " : "🤍"}
      </button>
      <span className="text-sm" aria-hidden="true">
        x {hearts}
      </span>
      <span className="sr-only">{hearts} likes</span>
    </div>
  );
};

export default LikeButton;
