import { useState } from "react";

export default function Timestamp({createdAt}) {
  const created = useState(Date.now()) [0];
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
     <span className="text-gray-400 text-sm">
      {formatTimeAgo()}
      </span>
    );
  }