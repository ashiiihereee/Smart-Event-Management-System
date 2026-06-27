# 🎪 Smart Event Management System
### Web Programming & Database Management | NMIMS, Chandigarh Campus

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![Modules](https://img.shields.io/badge/Modules-3%20Role--Based-brightgreen?style=flat)

---

## 📌 Project Overview

A **full-stack web application** to digitize and automate the complete college event lifecycle — from registration and team formation to attendance tracking and certificate generation. Built with a role-based system covering three distinct user types: Student, Coordinator, and Admin.

Built as part of the **Web Programming (WP)** course at **NMIMS, Chandigarh Campus** under the guidance of **Ms. Sukhwant Kaur**.

---

## ✨ Key Highlights

| Feature | Details |
|---|---|
| 👤 Role-Based Access | Student · Coordinator · Admin — 3 separate modules |
| 📋 Event Management | Create, manage, track and close events by category |
| 🧑‍🤝‍🧑 Team Registration | Solo and team-based event registration support |
| 📊 Admin Analytics | Participation trends, category breakdowns, attendance rates |
| 🏅 Certificate Tracking | Auto-track and issue certificates for attended events |
| 🗄️ Backend | Node.js server connected to MySQL database |
| 🔐 Authentication | Email, phone, and Google sign-in support |

---

## 🛠️ Tech Stack

- **Frontend:** HTML5 · CSS3 · JavaScript
- **Backend:** Node.js · Express.js
- **Database:** MySQL
- **Tools:** MySQL Workbench · dbdiagram.io · VS Code

---

## 📂 Project Structure

```
Smart-Event-Management-System/
│
├── frontend/
│   ├── index.html                  # Homepage — featured events, stats, navigation
│   ├── login.html                  # Login & Register — email, phone, Google sign-in
│   ├── events.html                 # Event listing with filters
│   ├── event-details.html          # Event description, rules, requirements, slots
│   ├── register-event.html         # Team/solo registration form
│   │
│   ├── student/
│   │   ├── dashboard.html          # Overview — registered events, deadlines
│   │   ├── profile.html            # Personal details, participation history
│   │   └── my-events.html          # Registered events, attendance & cert status
│   │
│   ├── coordinator/
│   │   ├── dashboard.html          # Assigned events, pending actions, slot utilization
│   │   ├── my-events.html          # Manage assigned events
│   │   ├── participants.html       # Participant management per event
│   │   ├── attendance.html         # Mark and export attendance
│   │   └── profile.html            # Coordinator details & event history
│   │
│   └── admin/
│       ├── dashboard.html          # Full system overview — events, users, registrations
│       ├── events.html             # Event control — create, edit, delete
│       ├── users.html              # User management — students & coordinators
│       ├── roles.html              # Role assignment — assign coordinators to events
│       ├── analytics.html          # Participation analytics & reports
│       ├── attendance.html         # Attendance overview across all events
│       └── settings.html           # Categories, limits, platform preferences
│
├── backend/
│   ├── server.js                   # Node.js server — connected to MySQL
│   └── db.js                       # Database connection config
│
├── database/
│   ├── schema.sql                  # Table creation scripts
│   ├── sample_data.sql             # Sample inserts for all tables
│   └── er_diagram.png              # ER Diagram
│
├── WPProjectReport_AshnaBansal.pdf # Full project report
├── .gitignore
└── README.md
```

---

## 🗄️ Database Design

### Entities & Relationships

| Entity | Description |
|---|---|
| User | Students, Coordinators, and Admins |
| Event | All college events with details |
| Category | Technical · Cultural · Sports · Workshop |
| Registration | Student event registrations |
| Team Members | Members linked to a registration |
| Certificate | Issued after event attendance |

### Relationships
- One Coordinator (User) → creates many Events
- One Student (User) → registers for many Events
- One Event → has many Registrations
- One Registration → has many Team Members
- One Registration → generates one Certificate
- One Category → has many Events

### Tables Created
```sql
users · categories · events · registrations · team_members · certificates
```

### Constraints Applied
- `PRIMARY KEY` on all tables
- `FOREIGN KEY` linking registrations → events → users
- `UNIQUE` constraint on email
- `ENUM` for role (student/coordinator/admin), event_type (solo/team/both), status (upcoming/closed/completed)
- `NOT NULL` on critical fields

---

## 📄 Pages Built

### 🔓 Public (Before Login)
- **Homepage** — Featured events, upcoming deadlines, quick stats, navigation
- **Login / Register** — Email, phone, Google sign-in; role-based tabs (Student/Coordinator/Admin)
- **Events Listing** — All events with category, type, and status filters
- **Event Details** — Full description, rules, requirements, date, venue, fee, slots left, coordinator info

### 👤 Student Module
- **Dashboard** — Registered events count, upcoming deadlines, recent activity
- **Profile** — Personal details, participation stats, edit profile
- **Event Registration** — Solo/team registration form with event summary
- **My Events** — Track registration status, attendance, and certificates

### 🎯 Coordinator Module
- **Dashboard** — Assigned events, pending actions, slot utilization bars
- **My Events** — Manage events, view participants, mark attendance
- **Participants Page** — Search, filter, export participant list
- **Attendance Page** — Mark present/absent, quick mark all, export attendance

### ⚙️ Admin Module
- **Dashboard** — System-wide stats (25 events, 540 users, 1,240 registrations, 18 coordinators)
- **Events Control** — Create, edit, delete events across all categories
- **User Management** — Manage 522 students + 18 coordinators
- **Role Assignment** — Assign coordinators to events, track availability
- **Analytics** — Monthly trends, category breakdowns, avg attendance rate (84%)
- **Attendance Overview** — Event-wise attendance across all modules (94% overall rate)
- **Settings** — Category management, registration limits, platform preferences

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/ashiiihereee/Smart-Event-Management-System.git
cd Smart-Event-Management-System
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Set up the database
- Open MySQL Workbench
- Run `database/schema.sql` to create tables
- Run `database/sample_data.sql` to insert sample data

### 4. Configure database connection
Edit `backend/db.js`:
```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'smart_events'
});
```

### 5. Start the server
```bash
node server.js
```
Output:
```
Server started
Connected to MySQL ✅
```

### 6. Open the frontend
Open `frontend/index.html` in your browser — or use Live Server in VS Code.

---

## 🗃️ Sample Data Overview

| Table | Records |
|---|---|
| users | 14 (1 admin, 2 coordinators, 11 students) |
| categories | 3 (Technical, Cultural, Sports) |
| events | 8 (HackNova, Rhythm Fest, Football Championship, etc.) |
| registrations | 14 |
| team_members | 29 |
| certificates | 1 |

---

## 🚀 Future Scope

- Real-time notifications for registration confirmations and deadlines
- Advanced analytics with exportable PDF reports
- Automated certificate generation and email delivery
- Mobile-responsive design improvements
- Secure password hashing and JWT-based authentication
- Payment gateway integration for paid events

---

## 👩‍💻 Author

**Ashna Bansal**
SAP ID: 70572400052 | Roll No: D026 | Batch: A
NMIMS, Chandigarh Campus — School of Technology Management and Engineering

---

## 🙏 Acknowledgements

- **Ms. Sukhwant Kaur** — Web Programming Subject Teacher, NMIMS Chandigarh
- **Mr. Aditya Bakshi** — DBMS Subject Teacher, NMIMS Chandigarh
- [Node.js](https://nodejs.org/) — Backend Runtime
- [MySQL](https://www.mysql.com/) — Database
- [dbdiagram.io](https://dbdiagram.io/) — ER Diagram Tool
