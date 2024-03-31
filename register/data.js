const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sagar@2004',
    database: 'registration_form_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});


app.post('/register', (req, res) => {
    const { name, email, phone, address, password } = req.body;
    const sql = `INSERT INTO registration (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)`;
    connection.query(sql, [name, email, phone, address, password], (err, result) => {
        if (err) {
            res.status(500).send('Error registering user');
            throw err;
        }
        console.log('User registered successfully');
        res.status(200).send('User registered successfully');
    });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
