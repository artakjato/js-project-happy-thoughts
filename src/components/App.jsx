import { useEffect, useState } from "react";
import MessageCard from "./MessageCard.jsx";
import ThoughtForm from "./ThoughtForm.jsx";
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignupForm.jsx";


const API_URL = "https://happy-thoughts-api-8dht.onrender.com/api/thoughts";

const getAuthHeader = () => {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};  
}; 

function MyForm() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ isLoggedIn, setLoggedIn]  = useState(Boolean(localStorage.getItem("accessToken")));

  const handleLoggedIn = () => setLoggedIn(true);

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");
  setLoggedIn(false);
};

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        const withLikeState = data.map((thought) => ({
          ...thought,
          isLiked: Boolean(localStorage.getItem(`liked_${thought._id}`)),
        }));

        setMessages(withLikeState);
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

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("You must be logged in to post a thought.");
      return;
    }

    const newMessage = {
      message: trimmed,
    };

    const postMessage = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeader()},
          body: JSON.stringify(newMessage),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(
        data?.message || data?.error ||"Failed to post message");
        }
        setMessages((prevMessages) => [data, ...prevMessages]);
        setMessage("");
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    postMessage();
  }

  function handleLike(id) {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message._id === id
          ? {
              ...message,
              hearts: (message.hearts ?? 0) + 1,
              isLiked: true,
            }
          : message,
      ),
    );
    localStorage.setItem(`liked_${id}`, `${id}`);
    const postLike = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}/like`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to post like");
      } catch (error) {
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message._id === id
              ? {
                  ...message,
                  hearts: Math.max((message.hearts ?? 1) - 1, 0),
                  isLiked: false,
                }
              : message,
          ),
        );
        localStorage.removeItem(`liked_${id}`);
        setError(error.message);
      }
    };

    postLike();
  }

  function handleDelete(id) {
    const deleteMessage = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: { ...getAuthHeader() },
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) { 
          throw new Error(data?.message || data?.error || "Failed to delete message");
        }
        setMessages((prev) => prev.filter((m) => m._id !== id));
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };
    deleteMessage();
  }

  function handleEdit(id) {
    const messageObj = messages.find((m) => m._id === id);
    const newText = window.prompt("Edit thought", messageObj?.message || "");
    if (!newText) return;
    const patchMessage = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            ...getAuthHeader()
          },
          body: JSON.stringify({ message: newText }),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) { throw new Error(data?.error || data?.message ||"Failed to update message");}
      
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, message: data.message } : m)),
        );
        setError(null);
      } catch (error) {
        setError(error.message);
      }
  };

    patchMessage();
  }

  return (
    <main
      role="main"
      className="min-h-screen flex flex-col items-center bg-[#fdf5f5]"
      aria-label="Happy thoughts application"
    >

  {!isLoggedIn && (
  <>
    <LoginForm onLogin={handleLoggedIn} />
    <SignupForm onSignup={handleLoggedIn} />
  </>
)}

    {isLoggedIn && (
      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 rounded-full border border-black bg-white px-4 py-2 text-sm"
      >
        Logout
      </button>
    )}

      <ThoughtForm
        message={message}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

         {!isLoggedIn && (
        <p className="mt-4 text-sm text-gray-700">
          You are not logged in. Posting, editing and deleting require login.
        </p>
      )}

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

        {messages.map((message) => (
          <MessageCard
            key={message._id}
            id={message._id}
            message={message.message}
            hearts={message.hearts}
            createdAt={message.createdAt}
            isLiked={message.isLiked}
            onLike={() => handleLike(message._id)}
            onDelete={() => handleDelete(message._id)}
            onEdit={() => handleEdit(message._id)}
            canEdit={isLoggedIn}
            canDelete={isLoggedIn}
          />
        ))}
      </section>
    </main>
  );
}
export default MyForm;
