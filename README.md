# ⚡ Page Pulse – Web Page Audit Tool

A lightweight, high-performance web application that audits any public URL to extract and evaluate key SEO, structural, and performance metrics in real time.

Built for the **Digital Heroes Software Development Internship Task**.

---

## 🚀 Live Demo & Links

- **Live Web App:** [https://page-pulse-7vnv.onrender.com](https://page-pulse-7vnv.onrender.com) *(Update with your actual Render URL)*
- **GitHub Repository:** [https://github.com/Meghnath81/page-pulse](https://github.com/Meghnath81/page-pulse) *(Update with your actual GitHub URL)*

---

## 📌 Project Overview

Page Pulse allows users to input any public web address, fetches the underlying HTML document, parses the DOM using **Cheerio**, and returns detailed page quality and accessibility metrics via a structured REST API.

### Key Engineering Focus Areas:
- **Clean Architecture:** Separation of routing, business logic, and UI rendering.
- **Resilient Error Handling:** Precise HTTP status code mapping (`400`, `408`, `415`, `502`, `500`) to handle edge cases gracefully without server crashes.
- **Performance & Security:** In-memory parsing over heavy headless browsers, Gzip compression, and Helmet security headers.
- **Automated Testing:** Unit and integration testing with Jest and Supertest.

---

## ✨ Features

- 🟢 **Response Time Measurement:** Tracks exact server round-trip speed in milliseconds with dynamic visual status badges (*Fast*, *Average*, *Slow*).
- 🏷 **SEO Metadata Inspection:** Extracts `<title>`, `<meta name="description">`, and counts header tags (`<h1>`).
- 🖼 **Accessibility Audit:** Inspects images to detect missing or empty `alt` attributes (`alt=""`).
- 📊 **Content Density:** Calculates total word count across body text.
- 🛡 **Security & Sanitation:** Out-of-the-box XSS escaping for rendered data, CORS handling, and HTTP security headers via **Helmet**.
- ⚡ **Performance Optimization:** Response compression via **Compression** middleware.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Backend Framework** | Node.js, Express.js (Express Router) |
| **HTML Parsing & HTTP** | Axios, Cheerio |
| **Security & Utilities** | Helmet, Compression, Cors, Dotenv |
| **Testing Suite** | Jest, Supertest |
| **Frontend UI** | HTML5, CSS3, Vanilla JavaScript (Fetch API) |

---

## 📂 Folder Structure

```text
page-pulse/
├── public/
│   └── index.html          # Responsive frontend dashboard with XSS sanitization
├── routes/
│   └── auditRoutes.js      # Express Router endpoints (/api/audit)
├── services/
│   └── parserService.js    # Domain logic for DOM parsing & network fetches
├── server.js               # Application entry point, middlewares & server setup
├── server.test.js          # Integration test suite (Jest + Supertest)
├── .env.example            # Environment variables template
├── .gitignore              # Ignored files (node_modules, .env)
├── package.json            # Dependencies and npm scripts
└── README.md               # Project documentation