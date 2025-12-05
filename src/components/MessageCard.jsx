import LikeButton from "./LikeButton";

function MessageCard ({ text }) {
  return (
    <div className="relative w-full max-w-2xl">
      <div 
      className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 bg-black z-[-1]sm:translate-x-3 sm:translate-y-3" 
      aria-hidden="true"
      />

    <article className="relative z-[1] w-full border border-black h-36 bg-white px-4 py-4 sm:py-5 sm:px-6">
      <p className="text-sm text-black">{text}</p>
    <LikeButton />
    </article>
    </div>
  );
}
export default MessageCard;