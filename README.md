# 🛒 MultiCart

MultiCart is a full-stack E-Commerce web application built with **Next.js**, **TypeScript**, **MongoDB**, and **NextAuth**. The project focuses on modern authentication, secure user management, and scalable e-commerce architecture.

## 🚀 Features

### Authentication

* User Registration
* User Login with Email & Password
* Password Hashing using bcryptjs
* Google OAuth Authentication
* JWT Session Management
* Protected Routes using Middleware
* Role-Based User Support

### Database

* MongoDB Atlas
* Mongoose ODM
* Secure User Storage

### Tech Stack

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* MongoDB
* Mongoose
* NextAuth.js
* bcryptjs

## 📂 Project Setup

### Clone the Repository

```bash
git clone https://github.com/Dhruvjain2207/multicart.git
cd multicart
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_uri

AUTH_SECRET=your_auth_secret

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

### Run the Development Server

```bash
npm run dev
```

Visit:

```bash
http://localhost:3000
```

## 🔐 Authentication Flow

### Credentials Authentication

* User registers an account.
* Password is hashed using bcryptjs.
* User data is stored in MongoDB.
* User logs in using email and password.
* JWT session is created.

### Google Authentication

* User signs in using Google OAuth.
* If the user does not exist, a new account is created automatically.
* User information is stored in MongoDB.
* JWT session is generated.

## ✅ Completed Features

* User Registration
* Credentials Login
* Google OAuth Login
* MongoDB Integration
* Password Hashing
* JWT Authentication
* Session Management
* Middleware Route Protection

## 🚧 Upcoming Features

* Product CRUD Operations
* Cloudinary Image Uploads
* Shopping Cart
* Wishlist
* Order Management
* Admin Dashboard
* Payment Gateway Integration
* Product Reviews & Ratings

## 👨‍💻 Author

**Dhruv Jain**

Built while learning Full-Stack Development with Next.js and modern web technologies.
