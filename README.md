
# 🎟️ Ticket Reselling Platform

![Node.js](https://img.shields.io/badge/Node.js-14%2B-brightgreen?logo=node.js)
![React](https://img.shields.io/badge/React-18%2B-blue?logo=react)


> A modern, full-stack web application for buying and selling event tickets, featuring a robust backend, a sleek frontend, and a seamless user experience.

---

## 🚀 Features

- **User Registration & Authentication**: Secure sign-up, login, and session management.
- **Event Listing & Ticket Management**: Create, browse, and manage events and tickets.
- **Admin Dashboard**:(Future Scope) Powerful tools for administrators to manage users, events, and sales.
- **Chatbot Support**:(Future Scope) Integrated chatbot for instant user assistance.
- **Responsive Design**: Mobile-friendly and accessible on all devices.
- **Real-time Chat**: Communicate instantly with buyers and sellers.

---

## 🗂️ Project Structure

```
ticketreselling/
│
├── backend/    # Node.js/Express backend (API, DB, business logic)
│   ├── controllers/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── ...
│
├── frontend/   # React frontend (UI, static assets)
│   ├── src/
│   ├── public/
│   └── ...
│
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- SQL database (e.g., MySQL, PostgreSQL)

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your database connection in `db.js`.
4. (Optional) Run the database schema:
   ```bash
   # Adjust for your DBMS
   mysql -u <user> -p <database> < schema.sql
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend will typically run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:5000](http://localhost:5000) by default.

---

## 🗄️ Database

- The backend uses a SQL database. See [`backend/schema.sql`](backend/schema.sql) for the schema.
- Configure your database connection in [`backend/db.js`](backend/db.js).
- Use environment variables or a `.env` file for sensitive credentials.

---

## 📦 Technologies Used

- **Backend:** Node.js, Express.js, SQL (MySQL/PostgreSQL/SQLite)
- **Frontend:** React, JavaScript, CSS
- **Other:** Webpack, REST API, JWT (for auth), Nodemailer (for email), Socket.io (for chat)

---

## 📸 Screenshots

<p align="center">
  <img src="frontend/public/COMING SOON.png" alt="Coming Soon" width="400"/>
  <img src="frontend/public/auidence.png" alt="Audience" width="400"/>
</p>

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

---


## 🙋‍♂️ Contact & Support

- **Issues:** [GitHub Issues](https://github.com/mygithubkg/ticket_reselling/issues)

---

<p align="center"><b>⭐️ If you like this project, give it a star on GitHub! It will be completed soon adn updated time to time. ⭐️</b></p>
