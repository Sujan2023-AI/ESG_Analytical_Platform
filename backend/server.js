// server.js
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5001;

// Enable CORS for all routes
app.use(cors());  // This will allow cross-origin requests

// Middleware to parse JSON request body
app.use(express.json());

// Simple route to handle requests to the root path (/)
app.get('/', (req, res) => {
    res.send('Welcome to the Backend API! Use /authenticate for login.');
});

// Path to your CSV file (ensure it's correct relative to the server file location)
const registeredEmailsFile = './data/registered_emails.csv';

// Function to authenticate the user
const authenticateUser = (email, password) => {
    return new Promise((resolve, reject) => {
        let userFound = false;
        console.log(`Authenticating user with email: ${email} and password: ${password}`); // Log received email and password

        // Read the CSV and check for the user's credentials
        fs.createReadStream(registeredEmailsFile)
            .pipe(csv())
            .on('data', (row) => {
                // console.log(`Checking row: ${JSON.stringify(row)}`); // Log the row being checked
                if (row.email === email && row.password === password) {
                    userFound = true;
                    userData = {
                        success: true,
                        industry: row.industry,
                        name: row.name,        // Assuming 'name' field exists in the CSV
                        company: row.company,  // Assuming 'company' field exists in the CSV
                        email: row.email,
                    };
                    console.log('User found and authenticated'); // Log success
                    resolve(userData);
                }
            })
            .on('end', () => {
                if (!userFound) {
                    console.log('No matching user found'); // Log if no match found
                    reject({ success: false });
                }
            });
    });
};

// Endpoint to handle login authentication
app.post('/authenticate', (req, res) => {
    const { email, password } = req.body;

    authenticateUser(email, password)
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});