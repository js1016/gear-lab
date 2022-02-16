const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('static'));
const port = 3000;

let notes = {};

app.get('/', (req, res) => {
    if (req.hostname !== 'localhost') {
        res.redirect('http://localhost:3000');
        return;
    }
    if (!('user' in req.cookies) || !(req.cookies.user in notes)) {
        let id = uuidv4();
        while (id in notes) {
            id = uuidv4();
        }
        console.log(`New user: ${id}`);
        res.cookie('user', id);
        notes[id] = null;
    }
    res.sendFile(path.join(__dirname, 'pages', 'main.html'));
});

app.get('/result', (req, res) => {
    if (!('user' in req.cookies) || !(req.cookies.user in notes)) {
        res.redirect('/');
    } else {
        res.sendFile(path.join(__dirname, 'pages', 'result.html'));
    }
});

app.get('/getNote', (req, res) => {
    if ('user' in req.cookies && req.cookies.user in notes) {
        res.send({
            note: notes[req.cookies.user]
        });
    } else {
        res.sendStatus(400);
    }
});

app.options('/saveNote', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    setTimeout(() => {
        res.sendStatus(200);
    }, 500);
});

app.post('/saveNote', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if ('note' in req.body && 'user' in req.body && req.body.user in notes) {
        notes[req.body.user] = req.body.note;
        console.log(
            `User: ${req.body.user} saved note: ${notes[req.body.user]}`
        );
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

app.listen(port, () => {
    console.log(
        'App is running, you can access http://localhost:3000/ in browser'
    );
});
