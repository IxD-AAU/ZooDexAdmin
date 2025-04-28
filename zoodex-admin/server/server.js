const express = require('express');
const { DatabaseSync } = require('node:sqlite');

const app = express();

const database = new DatabaseSync('./Dyr-DB.db');

app.get('/api/dyr', (req, res) => {
    const query = database.prepare('SELECT * FROM Dyr');
    const result = query.all();
    res.send(result);
})

app.get('/api/personale', (req, res) => {
    const query = database.prepare('SELECT * FROM Personale');
    const result = query.all();
    res.send(result);
})

app.get('/api/beskeder', (req, res) => {
    const query = database.prepare('SELECT * FROM Beskeder');
    const result = query.all();
    res.send(result);
})

app.get('/api/events', (req, res) => {
    const query = database.prepare('SELECT * FROM Events');
    const result = query.all();
    res.send(result);
})


app.use(express.static('<path to your angular app>'));

app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello World!'});
   });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000!');
});