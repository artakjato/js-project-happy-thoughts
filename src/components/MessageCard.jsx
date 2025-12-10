import LikeButton from "./LikeButton";
import Timestamp from "./TimeStamp";

function MessageCard({ message, hearts, createdAt, onLike, isLiked }) {
  return (
    <div className="relative w-full max-w-2xl">
      <div
        className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 bg-black z-[-1] sm:translate-x-3 sm:translate-y-3"
        aria-hidden="true"
      />

      <article className="relative z-[1] w-full border border-black bg-white px-4 py-4 sm:py-5 sm:px-6 rounded-md">
        <p className="text-sm text-black break-words">
          {message}
          </p>
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
          <LikeButton hearts={hearts} onLike={onLike} isLiked={isLiked} />
          <Timestamp createdAt={createdAt} />
        </div>
      </article>
    </div>
  );
}
export default MessageCard;
