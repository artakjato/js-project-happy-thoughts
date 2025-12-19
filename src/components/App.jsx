import { useState, useEffect } from "react";
import MessageCard from "./MessageCard.jsx";
import ThoughtForm from "./ThoughtForm.jsx";
const API_URL = "https://happy-thoughts-api-4ful.onrender.com/thoughts";

function MyForm() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        data.forEach((thought) => {
          let likedThought = localStorage.getItem(`liked_${thought._id}`);
          if (likedThought) {
            thought.isLiked = true;
          }
          setMessages(data);
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = message.trim();
    if (!trimmed) return;

    const newMessage = {
      message: trimmed,
    };

    const postMessage = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage),
        });
        if (!response.ok) throw new Error("Failed to post message");
        const data = await response.json();
        setMessages((prevMessages) => [data, ...prevMessages]);
        setMessage("");
      } catch (error) {
        setError(error.message);
      }
    };

    postMessage();
  }

  function handleLike(id) {
    const postLike = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}/like`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to post like");
        const data = await response.json();
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message._id === id
              ? { ...message, hearts: data.hearts, isLiked: true }
              : message
          )
        );
        localStorage.setItem(`liked_${id}`, `${id}`);
      } catch (error) {
        setError(error.message);
      }
    };
    postLike();
  }

  return (
    <main
      role="main"
      className="min-h-screen flex flex-col items-center bg-[#fdf5f5]"
      aria-label="Happy thoughts application"
    >
      <ThoughtForm
        message={message}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <section
        className="mt-6 flex flex-col items-center h-30 gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="List of happy thoughts"
      >
        {loading && (
          <p className="text-sm text-gray-600" role="status">
            Loading happy thoughts...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {messages.map((message, index) => (
          <MessageCard
            key={index}
            message={message.message}
            hearts={message.hearts}
            createdAt={message.createdAt}
            isLiked={message.isLiked}
            onLike={() => handleLike(message._id)}
          />
        ))}
      </section>
    </main>
  );
}
export default MyForm;
