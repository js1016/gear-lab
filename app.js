const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
app.use(cookieParser());
const port = 3000;

let notes = {};

app.get('/', (req, res) => {
    if (!('user' in req.cookies) || !(req.cookies.user in notes)) {
        let id = uuidv4();
        while (id in notes) {
            id = uuidv4();
        }
        res.cookie('user', id);
        notes[id] = null;
    }
    res.sendFile(path.join(__dirname, 'pages', 'main.html'));
});

app.get('/result', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'result.html'));
});

app.get('/getNotes', (req, res) => {
    if ('user' in req.cookies && req.cookies.user in notes) {
        res.send({
            notes: notes[req.cookies.user]
        });
    } else {
        res.sendStatus(400);
    }
});

app.options('/save', (req, res) => {
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, PUT, POST, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With'
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        res.sendStatus(200);
    }, 500);
});

app.post('/save', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if ('notes' in req.body && 'user' in req.body && req.body.user in notes) {
        notes[req.body.user] = req.body.notes;
        console.log(
            `Saved notes to: ${notes[req.body.user]} for user: ${req.body.user}`
        );
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.listen(port, () => {
    console.log('App is running...');
});
