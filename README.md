# Airbnb Major Project

A full-stack web application inspired by Airbnb, built with Node.js, Express, MongoDB, and EJS. Users can browse, filter, and review property listings across major Indian cities.

## Features

- User authentication (register, login, logout)
- Browse and filter listings by city
- View listing details with images and price
- Add, edit, and delete listings (for authorized users)
- Leave reviews on listings
- Flash messages for user feedback
- Responsive UI with EJS templates
- Session management with MongoDB store

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Passport.js (local strategy)
- EJS & ejs-mate
- Bootstrap (for styling)
- connect-mongo (session store)
- dotenv (environment variables)

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Atlas account (or local MongoDB)
- [Cloudinary](https://cloudinary.com/) account (for image uploads, if used)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/airbnb-major-project.git
   cd airbnb-major-project
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add:
   ```
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   MAP_TOKEN=your_mapbox_token (if used)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name (if used)
   CLOUDINARY_KEY=your_cloudinary_key (if used)
   CLOUDINARY_SECRET=your_cloudinary_secret (if used)
   ```

4. **Run the app locally:**
   ```sh
   npm start
   ```
   The app will run on [http://localhost:8080](http://localhost:8080).

## Deployment

This app is ready to deploy on [Render](https://render.com/) or similar Node.js hosting platforms.

- Make sure all environment variables are set in your Render dashboard.
- The root route `/` redirects to `/listings`.

## Folder Structure

```
Major project/
├── models/
├── public/
├── routes/
├── utils/
├── views/
├── app.js
├── package.json
└── .env (not committed)
```

## License

This project is for educational purposes.

---

**Deployed Demo:**  
[https://airbnb-major-project-471t.onrender.com](https://airbnb-major-project-471t.onrender.com)
