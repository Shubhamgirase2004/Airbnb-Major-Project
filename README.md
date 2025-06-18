# 🏡 Airbnb Major Project

A full-stack web application inspired by [Airbnb](https://airbnb.com), developed to simulate a real-world property rental platform. Built using **Node.js**, **Express**, **MongoDB**, and **EJS**, the app enables users to browse, filter, and manage property listings across Indian cities with responsive design and user-friendly interactions.

<br>

## 🌟 Key Features

- 🔐 User Authentication (Register, Login, Logout)
- 🏙️ Browse & Filter Listings by City
- 🏠 Add, Edit, and Delete Property Listings
- 🖼️ View Listing Details with Image Gallery and Pricing
- 💬 Leave and View Reviews on Listings
- 💡 Flash Messages for Real-Time User Feedback
- 📱 Responsive UI with EJS Templating
- 🗂️ Session Management using MongoDB Store

<br>

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-808080?style=for-the-badge)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Render](https://img.shields.io/badge/Deployed%20on-Render-46B1B5?style=for-the-badge&logo=render&logoColor=white)

<br>

## 🚀 Live Demo

🔗 [Click to Visit the App](https://airbnb-major-project-production.up.railway.app/listings)

<br>

## 📂 Folder Structure

airbnb-major-project/
├── models/ # Mongoose schemas
├── public/ # Static assets (CSS, JS)
├── routes/ # Express route files
├── utils/ # Helper functions & middleware
├── views/ # EJS Templates
├── app.js # Main application file
├── package.json # Dependencies
└── .env # Environment variables (not committed)

bash
Copy
Edit

<br>

## ⚙️ Getting Started

### Prerequisites

- Node.js & npm installed
- MongoDB Atlas account or local instance
- [Cloudinary](https://cloudinary.com/) account (if using image uploads)

### Installation

```bash
git clone https://github.com/Shubhamgirase2004/airbnb-major-project.git
cd airbnb-major-project
npm install
Setup Environment Variables
Create a .env file in the root directory and add:

env
Copy
Edit
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
MAP_TOKEN=your_mapbox_token (optional)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name (optional)
CLOUDINARY_KEY=your_cloudinary_key (optional)
CLOUDINARY_SECRET=your_cloudinary_secret (optional)
Run the App
bash
Copy
Edit
npm start
Visit: http://localhost:8080

<br>
🌍 Deployment
This app is ready to deploy on platforms like Render, Railway, or Vercel (for APIs).

Add the same environment variables to your hosting provider.

Confirm file uploads are correctly routed via Cloudinary (if integrated).

<br>
📜 License
This project is built solely for educational purposes.
