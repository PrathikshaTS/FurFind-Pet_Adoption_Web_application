# FurFind Pet Adoption Web Application

FurFind is a MERN (MongoDB, Express.js, React.js, Node.js) stack web application designed to connect prospective pet adopters with available pets in their vicinity. The platform leverages geolocation to display nearby pets and facilitates real-time communication with shelters, ensuring a seamless adoption experience.

## Features

- **Geolocation-Based Pet Discovery**: View available pets for adoption sorted by proximity.
- **Real-Time Chat with Shelters**: Engage in live conversations with shelters to inquire about pets.
- **User Authentication**: Secure sign-up and login functionalities.
- **Pet Listings Management**: Shelters can add, update, and remove pet listings.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Real-Time Communication**: Socket.io
- **Cloud Storage**: Cloudinary for pet images
- **Geolocation**: HTML5 Geolocation API

## Clone the Repository

git clone https://github.com/PrathikshaTS/FurFind-Pet_Adoption_Web_application.git

cd FurFind-Pet_Adoption_Web_application

## Configuration / Environment Variables
**Create a `.env` file in the backend folder with the following variables:**

PORT=8000
CLIENT_URL=http://localhost:5173

JWT_SECRET=my-key
MONGODB_URI=<your_mongodb_connection_string>

CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

**Create a `.env` file in the frontend folder with the following variables:**
VITE_BACKEND_URL=http://localhost:8000

## Usage / How to Run

### Backend

1. Navigate to the backend folder:. 

cd backend

2. Install dependencies:
 
npm install

3.Start the backend server:

npm start

### Frontend

1.Navigate to the backend folder:
  
  cd ../frontend

2.Install dependencies:
  
  npm install

3.Start the frontend development server:

  npm run dev



