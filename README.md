Happy Thoughts 💖 (Frontend)

A React web application where users can create accounts, log in, and share short “happy thoughts” with others.
Users can like posts, edit or delete their own thoughts, and see a live feed of messages.

This app connects to a custom-built backend API.

🚀 Features

User authentication (sign up & login)
Post new happy thoughts (login required)
View all thoughts in real time
Like any thought
Edit and delete your own thoughts
Ownership protection (you can only modify your own posts)
“Time ago” timestamps (e.g. “5 minutes ago”)
Persistent login using localStorage
Responsive design (mobile, tablet, desktop)

🛠️ Tech Stack

React (functional components + hooks)
JavaScript (ES6+)
Tailwind CSS (styling)
Fetch API (HTTP requests)
localStorage (auth + likes)
Custom Backend API (Node.js + MongoDB)

🌍 Live Demo

Frontend: https://js-project-happy-thoughts-5d6v.onrender.com
Backend API: https://happy-thoughts-api-8dht.onrender.com

💭 How It Works
Viewing Thoughts
On page load, the app fetches all thoughts from the backend
Thoughts are sorted by newest first
Each thought shows:
Message
Hearts
Timestamp

Creating Thoughts:
Requires login
Sends authenticated POST request
New thought appears instantly in UI

Editing / Deleting:
Only available for the logged-in user’s own posts
Backend validates ownership
UI hides buttons for other users’ posts

Likes:
Anyone can like a thought
Likes are saved in localStorage
Prevents multiple likes from same user