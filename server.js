const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ash1315na@",  
    database: "smart_event_management"
});

db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("Connected to MySQL ✅");
    }
});


// Test route
app.get('/', (req, res) => {
    res.send("Server is running 🚀");
});

// ✅ Student Register API
app.post('/event/register', (req, res) => {
    const { team_name, members } = req.body;

    const event_id = 1; // hackathon
    const student_id = 4; // temporary (your user)

    const regSql = `
        INSERT INTO registrations (event_id, student_id, team_name, reg_date, payment_status, attendance_status, certificate_status)
        VALUES (?, ?, ?, NOW(), 'pending', 'absent', 'not_issued')
    `;

    db.query(regSql, [event_id, student_id, team_name], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error in registration");
        }

        const reg_id = result.insertId;

        // insert team members
        members.forEach(member => {
            if (member) {
                const memSql = "INSERT INTO team_members (reg_id, mem_name) VALUES (?, ?)";
                db.query(memSql, [reg_id, member]);
            }
        });

        res.send("Registration Successful ✅");
    });
});

app.put('/event/update', (req, res) => {
    const { id, title, c_id, event_type, event_date, venue, fee, max_participants, description } = req.body;

    const sql = `
        UPDATE events 
        SET title=?, description=?, c_id=?, event_type=?, event_date=?, venue=?, fee=?, max_participants=?
        WHERE event_id=?
    `;

    db.query(sql, [title, description, c_id, event_type, event_date, venue, fee, max_participants, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error updating");
        }
        res.send("Updated successfully ✅");
    });
});

// ✅ USER REGISTER API

app.post('/user/register', (req, res) => {
    const { full_name, email, password, role, phone_no, department } = req.body;

    console.log("Incoming Data:", req.body); // 🔥 DEBUG

    if (!full_name || !email || !password || !role || !phone_no || !department) {
        return res.status(400).send("All fields are required");
    }

    const checkSql = "SELECT * FROM users WHERE email = ?";
    
    db.query(checkSql, [email], (err, result) => {
        if (err) {
            console.log("CHECK ERROR:", err);
            return res.status(500).send("Error checking user");
        }

        if (result.length > 0) {
            return res.status(400).send("User already exists with this email");
        }

        const insertSql = `
            INSERT INTO users 
            (full_name, email, password, role, phone_no, department, created_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        `;

        db.query(insertSql, [full_name, email, password, role, phone_no, department], (err, result) => {
            if (err) {
                console.log("INSERT ERROR:", err); // 🔥 THIS WILL SHOW REAL PROBLEM
                return res.status(500).send("Error registering user");
            }

            console.log("User Inserted:", result);
            res.send("User registered successfully ✅");
        });
    });
});

// 🔵 GET EVENTS API
app.get('/events', (req, res) => {
    const sql = `
        SELECT e.*, c.c_name 
        FROM events e
        JOIN categories c ON e.c_id = c.c_id
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error fetching events");
        } else {
            res.json(result);
        }
    });
});


// 🟢 GET CERTIFICATES API
app.get('/certificates/:reg_id', (req, res) => {
    const reg_id = req.params.reg_id;

    const sql = "SELECT * FROM certificates WHERE reg_id = ?";

    db.query(sql, [reg_id], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error fetching certificates");
        } else {
            res.json(result);
        }
    });
});

// CREATE EVENT API
app.post('/event/create', (req, res) => {
    const { title, description, c_id, event_type, event_date, event_time, venue, fee, max_participants } = req.body;

    const sql = `
        INSERT INTO events 
        (title, description, c_id, event_type, event_date, event_time, venue, fee, max_participants, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'upcoming')
    `;

    db.query(sql, [title, description, c_id, event_type, event_date, event_time, venue, fee, max_participants], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error creating event");
        }

        res.send("Event created successfully ✅");
    });
});

app.delete('/event/delete/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM events WHERE event_id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Error deleting");
        }

        res.send("Deleted successfully ✅");
    });
});



app.post('/user/login', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: "Server error" });
        }

        if (result.length > 0) {
            res.json({
                success: true,
                user: result[0]
            });
        } else {
            res.json({
                success: false,
                message: "Invalid email or password"
            });
        }
    });
});

app.listen(3000, () => {
    console.log("Server started");
});