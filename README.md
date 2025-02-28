# **💼 JobTracker**  

*"Your personal job application tracker to manage, organize, and stay on top of your job search!"*  

---

## **🚀 Description:**  

**JobTracker** is a web application designed to help job seekers efficiently track and manage their job applications. Applying to multiple companies can be overwhelming, especially when organizations require applicants to use different portals, create accounts, or provide multiple follow-ups. JobTracker solves this problem by offering a **centralized dashboard** where users can:  

✅ **Add, edit, and delete job applications**  
✅ **Store login credentials for company job portals** (optional)  
✅ **Sort and filter applications by company, date applied, and application status**  
✅ **Keep track of application progress (Applied, Interviewing, Offer, Rejected, etc.)**  

By providing a **simple, structured, and intuitive** tracking system, JobTracker enhances productivity and improves organization during the job search process.  

---

## **🛠️ Technologies Used:**  

### **Frontend (React & UI)**  
- **React.js** – Component-based UI development.  
- **React Router** – Client-side routing.  
- **Bootstrap 5** – Responsive UI and styling.  
- **Axios** – API calls to the backend.  
- **React Hooks** – State and effect management.  

### **Backend (Node.js & Express.js)**  
- **Node.js** – Server-side runtime.  
- **Express.js** – RESTful API for handling job applications and authentication.  
- **MongoDB Atlas** – Cloud database for persistent storage.  
- **Mongoose** – ODM (Object Data Modeling) for MongoDB.  

### **Authentication & Security**  
- **JWT (JSON Web Tokens)** – Secure authentication.  
- **BCrypt.js** – Password hashing.  
- **Nodemailer** – Email service for password recovery.  

### **Deployment & Hosting**  
- **Heroku** – Backend and frontend hosting.  
- **MongoDB Atlas** – Cloud database hosting.  
- **Git & GitHub** – Version control and collaboration.  

---

## **📚 Skills & Concepts Applied:**  

### **Full-Stack Development**  
- **Frontend + Backend Integration** – Connecting a React-based frontend with an Express/MongoDB backend.  
- **RESTful API Development** – CRUD operations (Create, Read, Update, Delete).  

### **Software Engineering Best Practices**  
- **Modular Code Structure** – Organized folder structure for scalability.  
- **Middleware Implementation** – Authentication middleware for route protection. 
- **Environment Variables (`.env`)** – Securing API keys & database credentials.  

### **Data Management & State Handling**  
- **MongoDB Atlas** – Storing job application details.  
- **React State (`useState`, `useEffect`)** – Managing dynamic UI updates.  
- **Filtering & Sorting Algorithms** – Sorting jobs by date, company, and status.  

### **Authentication & Authorization**  
- **JWT Authentication** – Secure user login.  
- **Password Hashing with Bcrypt** – Secure password storage.  
- **User Session Management** – Local storage handling for authentication.  

### **UI/UX & Performance Optimization**  
- **Responsive UI with Bootstrap** – Mobile-friendly design.  
- **Optimized API Calls with Axios** – Efficient data fetching and state updates.  
- **Loading States & Error Handling** – Improved user experience with alerts and form validation.  

---

## **📖 Features & How to Use JobTracker:**  

### **User Authentication:**  
- **Signup/Login:** Create an account to start tracking job applications.  
- **Forgot Password:** Reset credentials via email if needed.  

### **Job Application Management:**  
- **Add New Job:** Store details such as company, position, job link, and login credentials.  
- **Edit Job Details:** Update status, links, or credentials as needed.  
- **Delete Job Entry:** Remove outdated applications.  

### **Sorting & Filtering:**  
- **Sort by Date Applied, Company, or Status.**  
- **Filter by Status (Applied, Interviewing, Offer, etc.)**  
- **Search Functionality** – Quickly find specific job entries.  

### **Security & Data Handling:**  
- **Secure Storage:** User credentials are encrypted.  
- **Authenticated Routes:** Access control using JWT.  
- **Backend Validation:** Prevents invalid or duplicate entries.  

---

## **📈 Ideas for Future Improvements:**  

- **Task Reminders & Notifications** – Get notified about follow-ups and deadlines.  
- **Custom Status Categories** – Allow users to define custom application statuses.  
- **Interview Tracking & Notes** – Save interview details and feedback.  
- **Multi-User Collaboration** – Shared job tracking for teams or career coaches.  

---

## **📜 How to Run the Project Locally:**  

### **1. Clone the Repository:**  
```bash
git clone https://github.com/cltxvz/jobTracker.git
```
### **2. Install Backend Dependencies:**  
```bash
cd jobTracker
npm install
```
### **3. Set Up Environment Variables:**  
Create a `.env` file in the root directory and add:  
```env
MONGO_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

### **4. Start the Backend Server:**  
```bash
npm start
```
or  
```bash
node server.js
```

### **5. Install & Run the Frontend:**  
```bash
cd client
npm install
npm start
```
Then, visit:  
```
http://localhost:3000
```

---

## **🌎 Live Demo (Hosted on Heroku)**  
**JobTracker:** [https://jobtracker-frontend-32244539ef91.herokuapp.com](https://jobtracker-frontend-32244539ef91.herokuapp.com)  

---

## **👤 Author:**  
**Carlos A. Cárdenas**  

🚀 If you found this project useful, **star the repo** and feel free to contribute!  

---

### **✅ Final Notes:**  
This project was built to demonstrate full-stack development skills, covering frontend & backend integration, authentication, CRUD operations, and deployment. If you’d like to improve it or use it for your own job search, feel free!  

Thank you for checking out **JobTracker**! 🎯💼🚀