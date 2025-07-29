# 🌍 Natours - Adventure Tour Booking App

This is a full-stack web application built using **Node.js**, **Express**, **MongoDB**, **Pug**, and several modern tools and services such as **Stripe**, **JWT**, **SendGrid**, and **Mapbox**. The project simulates a real-world tour booking platform, enabling users to browse exciting tour packages, sign up, log in, make bookings, view maps, and complete payments securely.

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: Server-rendered views using Pug
- **Authentication**: JWT-based auth (access & refresh tokens)
- **Email Services**: SendGrid (welcome & reset password emails)
- **Payment Integration**: Stripe Checkout API
- **Map Integration**: Mapbox GL JS
- **Security**:
  - Rate Limiting
  - Data Sanitization (NoSQL Injection, XSS)
  - Helmet for HTTP headers
  - CORS configuration
  - Secure cookies & HTTPOnly flags

---

## 🔐 Features

- ✅ User signup, login, and logout using JWT
- ✅ Role-based access control (user/admin)
- ✅ Password reset and email verification (via SendGrid)
- ✅ Map view of tours (via Mapbox)
- ✅ Fully working Stripe payment gateway for bookings
- ✅ Secure implementation using Helmet, rate limiter, and sanitizers
- ✅ Search and filter tours (basic UI)
- ✅ Responsive UI with modern design

---
