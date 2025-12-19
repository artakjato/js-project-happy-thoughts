export default function ThoughtForm({ message, handleChange, handleSubmit }) {
  return (
    <section
      className="mt-10 flex justify-center px-4 sm:px-6 lg:px-8 w-full"
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
          <h1 className="text-lg font-bold text-black mb-2">
            Share a happy thought
          </h1>

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
            aria-invalid={message.trim().length === 0 ? "true" : "false"}
            className="mt-3 block h-24 w-full rounded-sm border border-gray-300 bg-white p-3 text-sm text=gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />

          <p id="message-help" className="mt-2 text-xs text-gray-600">
            Write a short message about what makes you happy. This field cannot
            be empty
          </p>

          <button
            type="submit"
            onClick={handleSubmit}
            value="Submit"
            disabled={message.trim().length === 0}
            className="mt-5 ml-2 flex ww-full items-center justify-center gap-2 rounded-full bg-[#f28c8c] px-6 py-3 text-sm font-semibold text-black shadow-sm hover:bg-[#ffa0a0] focus-visible:outline focus-visible:outline:2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 transition sm:w-auto sm:px-10"
          >
            <span aria-hidden="true">💖</span>
            <span> Send A Happy Thought </span>
            <span aria-hidden="true">💖</span>
          </button>
        </form>
      </div>
    </section>
  );
}