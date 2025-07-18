# 🎓 Online Clearance Processing System – Backend

This is the backend API for the **Online Clearance Processing System for Final Year Students**, designed with **Node.js**, **Express.js**, and **MySQL** (using Prisma ORM). It supports role-based authentication, departmental and faculty workflow integration, and document uploads.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Student, Department, Faculty, Admin roles)
- 📋 Submit and track clearance requests
- 🧾 Departmental and faculty officers approve/reject stages
- 📎 Document upload support
- 🛠 Role-based dashboards and actions
- 📡 RESTful API design with JSON responses

---

## 🧰 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: MySQL
- **Authentication**: JWT + bcryptjs
- **File Uploads**: Multer or Cloudinary (optional)
- **Environment**: dotenv
- **Security**: Helmet, CORS

---

## 📁 Project Structure

```bash
backend/
├── prisma/
│   └── schema.prisma       # Prisma schema file
├── src/
│   ├── controllers/        # Request handlers
│   ├── routes/             # API route definitions
│   ├── middlewares/        # Auth & validation middlewares
│   ├── config/             # DB and env configuration
│   ├── utils/              # Helpers (e.g. JWT, file handling)
│   └── app.js              # Express app entry point
├── server.js               # Server bootstrap file
├── .env                    # Environment variables
└── package.json
```
