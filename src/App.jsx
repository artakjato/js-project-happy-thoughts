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
      <div className="relative inline-block">
        <div className="absolute inset-0 translate-x-[8px] translate-y-[8px] bg-black" />
        
        <form
          onSubmit={handleSubmit}
          className=" relative border border-black bg-[#e3dede] p-6"
        >
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-black"
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
            onClick={handleSubmit}
            value="Submit"
            className="mt-5 flex w-58 items-left justify-left gap-2 rounded-full bg-[#f28c8c] px-4 py-3 text-sm font-semibold text-black shadow-sm hover:bg-[#ffa0a0] transition"
          >
            💖 Send A Happy Thought 💖
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyForm;
