# 🛒 React Admin Portal (Products, Agents, Orders)

## 📌 Project Overview
A fully functional React Admin Portal for managing **Products**, **Agents**, and **Orders**.  
Simulated APIs are used to mock real-world delays, server errors, and conflict scenarios.

---

---

## ⚙️ Technologies Used
- React.js (Vite + Tailwind CSS)
- React Router DOM
- React Query (for API data caching and mutations)
- Mock API with random delays, failures, and conflicts
- IndexedDB for offline support (recent orders)
- Toast notifications for success/failure
- Skeleton loaders and lazy loading for better UX
- Error Boundary for global error handling

---

## 🔗 Features
- Login Authentication (Mocked)
- Products Management (CRUD,View, Refresh, Search)
- Agents Management (CRUD,View, Refresh, Search)
- Orders Management (CRUD,View, Refresh, Search)
- Centralized State with React Query
- Global Error Handling using ErrorBoundary
- Random API Failures and Conflict Handling
- Offline Viewing of recent orders using IndexedDB
- Responsive, mobile-first design
- Modular and scalable folder structure

---

## 🖥️ How To Run Locally

1. Clone the repo
   ```bash
   git clone https://github.com/prajwalkhupat/Admin_Portal_task.git
   cd react-admin-portal
   npm install
   npm run dev

