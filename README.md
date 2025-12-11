# Happy Thoughts 💖

A small React app where users can post short “happy thoughts” and send hearts to each other.  
The app talks to a public API and shows a live feed of messages.


Features

✅ Fetches happy thoughts from a remote API
✅ Shows a list of thoughts with:
  The message text
  Number of hearts (likes)
  A “time ago” timestamp (e.g. “5 minutes ago”)
✅ Form to submit a new happy thought
✅ Like button for each thought:
  Sends a POST request to the API
  Updates the heart count in the UI
  Stores liked thoughts in localStorage so the like state persists
✅ Layout works on mobile, tablet, and desktop


Tech Stack

React (functional components + hooks)
JavaScript (ES6+)
Tailwind CSS for styling
Fetch API for HTTP requests
localStorage to remember liked thoughts
Backend API: https://happy-thoughts-api-4ful.onrender.com/thoughts
