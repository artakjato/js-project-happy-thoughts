import LikeButton from "./LikeButton";
import Timestamp from "./TimeStamp";

function MessageCard({
  message,
  hearts,
  createdAt,
  onLike,
  isLiked,
  onEdit,
  onDelete,
  canEdit,
  canDelete,
}) {
  return (
    <div className="relative isolate w-full max-w-2xl">
      <div
        className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 bg-black z-0 sm:translate-x-3 sm:translate-y-3"
        aria-hidden="true"
      />

      <article className="relative z-10 w-full border border-black bg-white px-4 py-4 pr-12 sm:py-5 sm:px-6 sm:pr-14 rounded-md">
        <p className="text-sm text-black break-words">{message}</p>

        {canEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="absolute top-3 right-12 sm:right-14 inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition"
            aria-label="Edit thought"
            title="Edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path d="M2 15a1 1 0 001 1h.586l9.292-9.292-1.586-1.586L2 14.414V15z" />
            </svg>
          </button>
        )}

      
        {canDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 transition"
          aria-label="Delete thought"
          title="Delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
          <LikeButton hearts={hearts} onLike={onLike} isLiked={isLiked} />
          <Timestamp createdAt={createdAt} />
        </div>
      </article>
    </div>
  );
}
export default MessageCard;
