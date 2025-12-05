import { useState } from "react";

export default function Timestamp() {
  const createdAt = useState(Date.now()) [0];

 function formatTimeAgo() {
      const seconds = Math.floor((Date.now() - createdAt) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes ago`;
 }

  return (
     <span className="text-gray-400 text-sm">
      {formatTimeAgo()}
      </span>
    );
  }