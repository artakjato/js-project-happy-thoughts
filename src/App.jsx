import { useState } from "react";
// import { createRoot } from "react-dom/client";

function MyForm() {
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.loge(message);
  }

  return (
    <div className="mx-auto mt-10 max-w-lg px-4">
      <div class Name="relative">
        <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-black" />
        
        <form
          onSubmit={handleSubmit}
          className="relative rounded-xl border border-gray-300 bg-[#f8f4f4] p-6 shadow-md"
        >
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-800"
          >
            What is making you happy right now?
          </label>

          <input
            type="text"
            placeholder="Write your message..."
            value={message}
            onChange={handleChange}
            className="mt-3 block h-24 w-full resize-none rounded-sm border border-gray-300 bg-white p-3 text-sm text=gray-900 focus:border-gray-500 focus:outline-none focus:ring-0"
          />

          <button
            type="submit"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#ffb4b4] px-4 py-3 text-sm font-semibold text-[#5b1a1a] shadow-sm hover:bg-[#ffa0a0] transition"
          >
            💖 Send A Happy Thought 💖
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyForm;
