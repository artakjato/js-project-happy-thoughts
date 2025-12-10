export default function Timestamp({ createdAt }) {
  const createdAtTime = new Date(createdAt).getTime();

  function formatTimeAgo() {
    const seconds = Math.floor((Date.now() - createdAtTime) / 1000);
    const hours = Math.floor(seconds / 3600);
    if (hours >= 1) return `${hours} hours ago`;

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes ago`;
  }

  return (
    <time dateTime={createdAt} className="text-gray-400 text-sm">
      {formatTimeAgo()}
    </time>
  );
}
