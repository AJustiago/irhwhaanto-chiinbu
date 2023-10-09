const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3124;

const pool = new Pool({
    connectionString: 'your_postgresql_connection_string_here',
});

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB CONNECTION
pool.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("PostgreSQL connected!")
    }
});

async function startApp() {
    // Endpoint for user registration
    app.post("/auth/register", async (req, res) => {
        const { name, email, password, password_confirm } = req.body;

        // Check if the email already exists in the database
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Email has already been registered" });
        }

        // Validate password requirements (minimum 8 characters, at least 1 capital letter)
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
        if (!password.match(passwordRegex)) {
            return res.status(400).json({ message: "Password does not meet requirements" });
        }

        // Validate name (no special characters)
        const nameRegex = /^[a-zA-Z0-9\s]+$/;
        if (!name.match(nameRegex)) {
            return res.status(400).json({ message: "Name contains special characters" });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);

        res.status(201).json({ message: "Registration successful" });
    });

    app.get("/api", (req, res) => {
        res.json({ message: "PING!!" });
    });
}

startApp();

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

// SDK SERVICE

// // Token in Ably
// var realtime = new Ably.Realtime({ key: KEY });
// // const realtime = new Ably.Realtime({ authUrl: '/auth' }); //authUrl

// const ablyClient = new Ably.Realtime({
//     authCallback: async (tokenParams, callback) => {
//         try {
//             const tokenRequest = await createTokenRequest() // Make a network request to your server
//             callback(null, tokenRequest)
//         } catch (error) {
//             callback(error, null)
//         }
//     }
// }); // authCallback

// // const realtime = new Ably.Realtime({ authUrl: "/auth", authMethod: "POST", authParams: { p1: param1, b: param2}, authHeaders: {h1: header1, h2: header2} }); // authOption


// async function ablyConnection(){
//     const ably = new Ably.Realtime.Promise(KEY);
//     await ably.connection.once('connected');
//     console.log('Connected to Ably!');
// }
    
// app.get("/api/ably", (req, res) => {
//     ablyConnection();
//     res.json({ message: "Connected To Ably!" });
//   });

// const ably = new Ably.Realtime(
//     {
//         key: 'xVLyHw.d7FkpA:lhV_EHVhqno-pTMQ14s2HWz9w6qyskgCIVBwkdJVVuQ',
//         transportParams: { heartbeatInterval: 10000 }
//     }
// );

// ably.close(); // runs synchronously
// console.log('Closed the connection to Ably.');



