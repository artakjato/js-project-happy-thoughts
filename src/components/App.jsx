import { useState, useEffect } from "react";
import MessageCard from "./MessageCard.jsx";
const API_URL = "https://happy-thoughts-api-4ful.onrender.com/thoughts?";

function MyForm() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoadding] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchMessages();
  });

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
        setMessages((prevMessages) => [...prevMessages, data]);
        setMessage("");
      } catch (error) {
        setError(error.message);
      }
    };

    postMessage();
  }

  return (
    <>
      <section
        className="mt-10 flex justify-center px-4 sm:px-6 lg:px-8"
        aria-label="Form for sharing what is making you happy right now"
      >
        <div className="relative w-full max-w-2xl">
          <div
            className="pointers-events-none absolute inset-0 translate-x-2 translate-y-2 bg-black sm:translate-x-3 sm:translate-y-3"
            aria-hidden="true"
          />

          <form
            onSubmit={handleSubmit}
            className="relative border border-black bg-[#e3dede] px-4 py-4 sm:px-6 sm:py-5"
          >
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-black"
            >
              What is making you happy right now?
            </label>

            <input
              id="message"
              name="message"
              type="text"
              placeholder="Write your message..."
              value={message}
              onChange={handleChange}
              aria-describedby="message-help"
              className="mt-3 block h-24 w-full rounded-sm border border-gray-300 bg-white p-3 text-sm text=gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />

            <button
              type="submit"
              onClick={handleSubmit}
              value="Submit"
              disabled={message.trim().length === 0} // Disable button if input is empty
              className="mt-5 ml-2 flex ww-full items-center justify-center gap-2 rounded-full bg-[#f28c8c] px-6 py-3 text-sm font-semibold text-black shadow-sm hover:bg-[#ffa0a0] focus-visible:outline focus-visible:outline:2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 transition sm:w-auto sm:px-10"
            >
              <span aria-hidden="true">💖</span>
              <span> Send A Happy Thought </span>
              <span aria-hidden="true">💖</span>
            </button>
          </form>
        </div>
      </section>

      {/*Message Card Section*/}
      <section
        className="mt-6 flex flex-col items-center h-30 gap-4 px-4 sm:px-6 lg:px-8"
        aria-label="List of happy thoughts"
      >
        {messages.map((message, index) => (
          <MessageCard
            key={index}
            message={message.message}
            hearts={message.hearts}
            createdAt={message.createdAt}
          />
        ))}
      </section>
    </>
  );
}

export default MyForm;
