<div align="center">

<img src="https://img.shields.io/badge/LinkUp-Social%20Platform-6366f1?style=for-the-badge&logoColor=white" alt="LinkUp" />

# 🔗 LinkUp

**A modern social networking backend — connect, share, and engage.**

[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![Zod](https://img.shields.io/badge/Zod-3068B7?style=flat-square&logo=zod&logoColor=white)](https://zod.dev/)
[![AWS](https://img.shields.io/badge/AWS_S3-FF9900?style=flat-square&logo=amazons3&logoColor=white)](https://aws.amazon.com/s3/)

![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

</div>

---

## 📖 About

**LinkUp** is a scalable social networking backend built with **Express.js** and **TypeScript**. Designed for real-world use cases: user connections, content sharing, job discovery, and real-time communication — all in one platform.

> 🚧 Currently in active development. Core architecture is set up and features are being added progressively.

---

## ✨ Features

| Feature | Status |
|---|---|
| App Bootstrap with CORS & Global Error Handling | ✅ Done |
| Environment Config (dev / prod) with cross-env | ✅ Done |
| Generic Database Repository | ✅ Done |
| Global Exception Classes (400, 401, 403, 404, 409) | ✅ Done |
| Zod Validation Middleware | ✅ Done |
| Password Hashing with bcrypt | ✅ Done |
| Email Service with Nodemailer (Gmail SMTP) | ✅ Done |
| Event-Driven Email System (OTP, Confirmation, 2FA, ...) | ✅ Done |
| Redis Service (Singleton) | ✅ Done |
| User Auth — Signup & Login | ✅ Done |
| Google OAuth Signup | ✅ Done |
| JWT (Access + Refresh Tokens) | ✅ Done |
| Token Revocation with Redis | ✅ Done |
| Auth Middleware (Bearer & Basic) | ✅ Done |
| AWS S3 Media Uploads (Memory & Disk Storage) | ✅ Done |
| User Profile — Get & Update | ✅ Done |
| Follow System | ⏳ Coming Soon |
| Posts, Likes & Comments | ⏳ Coming Soon |
| Job Board (Post & Apply) | ⏳ Coming Soon |
| Real-time Chat (Socket.io) | ⏳ Coming Soon |
| Notifications System | ⏳ Coming Soon |
| Role-Based Access Control (RBAC) | ⏳ Coming Soon |
| Swagger API Documentation | ⏳ Coming Soon |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Express.js |
| **Language** | TypeScript |
| **Database** | MongoDB + Mongoose |
| **Cache** | Redis |
| **Validation** | Zod |
| **Auth** | JWT (Access + Refresh Tokens) |
| **OAuth** | Google OAuth2 |
| **Security** | bcrypt |
| **Email** | Nodemailer (Gmail SMTP) |
| **Storage** | AWS S3 |
| **Real-time** | Socket.io |
| **Dev Tooling** | concurrently, cross-env |

---

## 📁 Project Structure

```
src/
├── main.ts                        # Entry point
├── app.controller.ts              # Express app setup
├── config/
│   └── env.service.ts             # Environment variables
├── common/
│   ├── enums/                     # App enums (user roles, multer, ...)
│   ├── exceptions/                # HTTP exception classes & success response
│   ├── interfaces/                # TypeScript interfaces (IUser, ...)
│   ├── services/
│   │   ├── redis.service.ts       # Redis singleton service
│   │   ├── security.service.ts   # bcrypt wrapper service
│   │   ├── token.service.ts      # JWT generate & decode service
│   │   └── s3.service.ts         # AWS S3 upload service
│   └── utils/
│       ├── email/                 # Nodemailer + event-driven email system
│       └── security/              # Hash & compare utilities
├── database/
│   ├── connection.ts              # MongoDB connection
│   ├── models/                    # Mongoose models (user, post, message)
│   └── repository/
│       └── base.repository.ts    # Generic base repository
├── middleware/
│   ├── auth.middleware.ts         # JWT auth middleware (Bearer & Basic)
│   ├── error.middleware.ts        # Global error handler
│   └── validation.middleware.ts  # Zod validation middleware
└── modules/
    ├── auth/                      # Signup, Login, Google OAuth, Verify Email
    ├── users/                     # User profile & management
    ├── posts/                     # Posts CRUD
    └── messages/                  # Messaging system
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js `>= 18`
- MongoDB
- Redis
- AWS S3 Bucket

### Installation

```bash
# Clone the repo
git clone https://github.com/hazzem-web/LinkUp-SocialMedia.git
cd LinkUp-SocialMedia

# Install dependencies
npm install
```

### Environment Variables

Create `.env.dev` and `.env.prod` files in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/linkup
REDIS_URI=redis://localhost:6379
SALT=10
SECRET=your_secret
JWT_USER_SIGNATURE=your_user_signature
JWT_ADMIN_SIGNATURE=your_admin_signature
JWT_USER_REFRESH_SIGNATURE=your_user_refresh_signature
JWT_ADMIN_REFRESH_SIGNATURE=your_admin_refresh_signature
BASE_DOMAIN=http://localhost:
MOOD=dev
APP_EMAIL=your_email@gmail.com
APP_PASSWORD=your_app_password
AWS_BUCKET_NAME=your_bucket_name
AWS_REGION=your_region
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_EXPIRATION_TIME=3600
```

### Running the App

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

---

## 📬 API Documentation

> Swagger docs will be available at `/api/docs` once the first modules are ready.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, open issues, or submit pull requests.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/hazzem-web">Hazzem</a></sub>
</div>