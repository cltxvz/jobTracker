# **💼 JobTracker**  

*"Your all-in-one tool to search, track, and manage your job applications efficiently!"*  

---

## **🚀 Description:**  

JobTracker is a full-featured job search and tracking application designed to help job seekers stay organized and increase their efficiency during the job hunt. It eliminates the chaos of multiple job portals, lost application links, and missed deadlines by providing a centralized dashboard with the following features:

- ✅ Search for jobs directly within the app using integrated APIs (Google Jobs & Adzuna).
- ✅ Save job listings instantly from search results to your personal dashboard.
- ✅ Add, edit, and delete job applications manually.
- ✅ Track application progress (Applied, Interviewing, Offer, Rejected, etc.).
- ✅ Use the built-in calendar to schedule deadlines, follow-ups, and interviews.
- ✅ Sort and filter applications by company, date applied, and job status.

Whether you're actively searching or tracking long-term applications, JobTracker makes the process organized, effortless, and stress-free!

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

### **Job Search Integration**  
- **SERPAPI (Google Jobs API)** – Fetch job listings from Google’s job search results.
- **Adzuna API** – Additional job listings for a broader job search experience.  

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

### **Dashboard & Tracking:**  
- **Add & Edit Jobs:** Manually add job applications or update existing ones.
- **Status Updates:** Track application progress (Applied, Interviewing, Offer, etc.).
- **Interactive Calendar:** Schedule deadlines and interview dates.

### **Sorting & Filtering:**  
- **Sort by Date Applied, Company, or Status.**  
- **Filter by Status (Applied, Interviewing, Offer, etc.)**  
- **Search Functionality** – Quickly find specific job entries.  

### **Job Search & Save:**  
- **Search for jobs** using the built-in job search powered by Google Jobs API & Adzuna API.
- **Save job listings** with one click to track them on your dashboard.
- **View job posts** directly on the employer’s website. 

### **Security & Data Handling:**  
- **Secure Storage:** User credentials are encrypted.  
- **Authenticated Routes:** Access control using JWT.  
- **Backend Validation:** Prevents invalid or duplicate entries.  

---

## **📈 Ideas for Future Improvements:**  

- **Task Reminders & Notifications** – Get notified about follow-ups, upcoming interviews, and deadlines.   
- **Job Application Auto-Fill** – Extract application details automatically. 
- **Job Insights & Analytics** – Track application trends over time.
- **Multi-User Collaboration** – Shared job tracking for teams or career coaches.  
- **AI-Based Job Matching** – Get job recommendations based on your saved applications.

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
This project demonstrates full-stack development, API integration, authentication, data management, and UI/UX best practices. It was built to enhance job search efficiency and help job seekers stay organized.

Thank you for checking out **JobTracker**! 🎯💼🚀