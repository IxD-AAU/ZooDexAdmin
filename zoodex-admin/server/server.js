const express = require('express');
const { DatabaseSync } = require('node:sqlite');

const app = express();

const database = new DatabaseSync('./Dyr-DB.db');

const cors = require('cors');

app.use(cors(origin = "http://localhost:4200"));

app.use(express.json());

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


app.post('/api/database/update', (req, res) => {
    if (req.body.DataSet=="Dyr"){
        try {
            const In_Zoo = "Yes";
            const query = database.prepare('UPDATE Dyr SET Name = ?, Description = ?, Personality = ?, WeightMaleMin = ?, WeightMaleMax = ?, WeightFemaleMin = ?, WeightFemaleMax = ?, Height = ?, Speed = ?, YoungMin = ?, YoungMax = ?, In_Zoo = ? WHERE ID = ?');
            query.run(req.body.Data.Name,req.body.Data.Description,req.body.Data.Personality,req.body.Data.WeightMaleMin,req.body.Data.WeightMaleMax,req.body.Data.WeightFemaleMin,req.body.Data.WeightFemaleMax,req.body.Data.Height,req.body.Data.Speed,req.body.Data.YoungMin,req.body.Data.YoungMax,In_Zoo,req.body.ID);
            res.status(200).send({ message: 'Dyr Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Dyr Database', details: error.message });
        }
    }
    else if(String(req.body.DataSet)=="Personale"){
        try {
            const query = database.prepare('UPDATE Personale SET Username = ?, Password = ?, FirstName = ?, LastName = ?, Mail = ?, Job = ?, WHERE ID = ?');
            query.run(req.body.Data.Username,req.body.Data.Password,req.body.Data.FirstName,req.body.Data.LastName,req.body.Data.Mail,req.body.Data.Job,req.body.ID);
            res.status(200).send({ message: 'Personale Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Personale Database', details: error.message });
        }
    }
    else if(String(req.body.DataSet)=="Beskeder"){
        try {
            const query = database.prepare('UPDATE Beskeder SET Title = ?, Category = ?, Sender = ?, Reciever = ? WHERE ID = ?');
            query.run(req.body.Data.Title,req.body.Data.Category,req.body.Data.Sender,req.body.Data.Reciever,req.body.ID);
            res.status(200).send({ message: 'Beskeder Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder Database' });
        }
    }
    else if(String(req.body.DataSet)=="Events"){
        try {
            const query = database.prepare('UPDATE Events SET Name = ?, Dato = ?, StartTime = ?, Info = ? WHERE ID = ?');
            query.run(req.body.Data.Name,req.body.Data.Dato,req.body.Data.StartTime,req.body.Data.Info,req.body.ID);
            res.status(200).send({ message: 'Events Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Events Database' });
        }
    }
    else {
        res.status(400).send({ error: 'Invalid DataSet' });
    
}});

app.post('/api/database/insert', (req, res) => {
    if (String(req.body.DataSet)=="Dyr"){
        try {
            const query = database.prepare('INSERT INTO Dyr (Name, Description, Personality, WeightMaleMin, WeightMaleMax, WeightFemaleMin, WeightFemaleMax, Height, Speed, YoungMin, YoungMax, In_Zoo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            query.run(req.body.Data.Name,req.body.Data.Description,req.body.Data.Personality,req.body.Data.WeightMaleMin,req.body.Data.WeightMaleMax,req.body.Data.WeightFemaleMin,req.body.Data.WeightFemaleMax,req.body.Data.Height,req.body.Data.Speed,req.body.Data.YoungMin,req.body.Data.YoungMax,"Yes");
            res.status(200).send({ message: 'Dyr Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Dyr Database', details: error.message });
        }
    }
    else if (String(req.body.DataSet)=="Personale"){
        try {
            const query = database.prepare('INSERT INTO Personale (Username, Password, FirstName, LastName, Mail, Job) VALUES (?, ?, ?, ?, ?, ?)')
            query.run(req.body.Data.Username,req.body.Data.Password,req.body.Data.FirstName,req.body.Data.LastName,req.body.Data.Mail,req.body.Data.Job);
            res.status(200).send({ message: 'Personale Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Personale Database', details: error.message });
        }
    }
    else if (String(req.body.DataSet)=="Beskeder"){
        try {
            const query = database.prepare('INSERT INTO Beskeder (Title, Category, Sender, Reciever) VALUES (?, ?, ?, ?)')
            query.run(req.body.Data.Title,req.body.Data.Category,req.body.Data.Sender,req.body.Data.Reciever);
            res.status(200).send({ message: 'Beskeder Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder Database' });
        }
    }
    else if (String(req.body.DataSet)=="Events"){
        try {
            const query = database.prepare('INSERT INTO Events (Name, Dato, StartTime, Info) VALUES (?, ?, ?, ?)')
            query.run(req.body.Data.Name,req.body.Data.Dato,req.body.Data.StartTime,req.body.Data.Info);
            res.status(200).send({ message: 'Events Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Events Database' });
        }
    }
    else {
        res.status(400).send({ error: 'Invalid DataSet' });
    }
})

app.post('/api/database/delete', (req, res) => {
    if (String(req.body.DataSet)=="Dyr"){
        try {
            const query = database.prepare('DELETE FROM Dyr WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Dyr Database entry deleted successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Dyr Database', details: error.message });
        }
    }
    else if (String(req.body.DataSet)=="Personale"){
        try {
            const query = database.prepare('DELETE FROM Personale WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Personale Database entry deleted successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Personale Database', details: error.message });
        }
    }
    else if (String(req.body.DataSet)=="Beskeder"){
        try {
            const query = database.prepare('DELETE FROM Beskeder WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Beskeder Database entry deleted successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder Database' });
        }
    }
    else if (String(req.body.DataSet)=="Events"){
        try {
            const query = database.prepare('DELETE FROM Events WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Events Database entry deleted successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Events Database' });
        }
    }
    else {
        res.status(400).send({ error: 'Invalid DataSet' });
    }
})

app.post('/api/database/storage', (req, res) => {
    if (String(req.body.DataSet)=="Dyr"){
        try {
            const query = database.prepare('INSERT INTO Dyr-STORAGE (Name, Description, Personality, WeightMaleMin, WeightMaleMax, WeightFemaleMin, WeightFemaleMax, Height, Speed, YoungMin, YoungMax) SELECT Name, Description, Personality, WeightMaleMin, WeightMaleMax, WeightFemaleMin, WeightFemaleMax, Height, Speed, YoungMin, YoungMax FROM Dyr WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('DELETE FROM Dyr WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Dyr Database entry stored successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Dyr Database', details: error.message });
        }
    }
    else if(String(req.body.DataSet)=="Personale"){
        try {
            const query = database.prepare('INSERT INTO Personale-STORAGE (Username, Password, FirstName, LastName, Mail, Job) SELECT Username, Password, FirstName, LastName, Mail, Job FROM Personale WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('DELETE FROM Personale WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Personale Database entry stored successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Personale Database', details: error.message });
        }
    }
    else if(String(req.body.DataSet)=="Beskeder"){
        try {
            const query = database.prepare('INSERT INTO Beskeder-STORAGE (Title, Category, Sender, Reciever) SELECT Title, Category, Sender, Reciever FROM Beskeder WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('DELETE FROM Beskeder WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Beskeder Database entry stored successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder Database' });
        }
    }
    else if(String(req.body.DataSet)=="Events"){
        try {
            const query = database.prepare('INSERT INTO Events-STORAGE (Name, Dato, StartTime, Info) SELECT Name, Dato, StartTime, Info FROM Events WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('DELETE FROM Events WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Events Database entry stored successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Events Database' });
        }
    }
    else {
        res.status(400).send({ error: 'Invalid DataSet' });
    }
})

app.post('/api/database/retrive', (req, res)=> {
    if (String(req.body.DataSet)=="Dyr"){
        try {
            const query = database.prepare('INSERT INTO Dyr (Name, Description, Personality, WeightMaleMin, WeightMaleMax, WeightFemaleMin, WeightFemaleMax, Height, Speed, YoungMin, YoungMax) SELECT Name, Description, Personality, WeightMaleMin, WeightMaleMax, WeightFemaleMin, WeightFemaleMax, Height, Speed, YoungMin, YoungMax FROM Dyr-STORAGE WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('DELETE FROM Dyr-STORAGE WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Dyr Database entry retrieved successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Dyr Database', details: error.message });
        }
    }
    else if (String(req.body.DataSet)=="Personale"){
        try {
            const query = database.prepare('INSERT INTO Personale (Username, Password, FirstName, LastName, Mail, Job) SELECT Username, Password, FirstName, LastName, Mail, Job FROM Personale-STORAGE WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('DELETE FROM Personale-STORAGE WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Personale Database entry retrieved successfully'});
        }
        catch (error) {
            res.status(500).send({ error: 'Failed to update Personale Database', details: error.message });
        }
    }
    else if (String(req.body.DataSet)=="Beskeder"){
        try {
            const query = database.prepare('INSERT INTO Beskeder (Title, Category, Sender, Reciever) SELECT Title, Category, Sender, Reciever FROM Beskeder-STORAGE WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('DELETE FROM Beskeder-STORAGE WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Beskeder Database entry retrieved successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder Database' });
        }
    } 
    else if (String(req.body.DataSet)=="Events"){
        try {
            const query = database.prepare('INSERT INTO Events (Name, Dato, StartTime, Info) SELECT Name, Dato, StartTime, Info FROM Events-STORAGE WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('DELETE FROM Events-STORAGE WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Events Database entry retrieved successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Events Database' });
        }
    } 
    else {
        res.status(400).send({ error: 'Invalid DataSet' });
    }
})


app.use(express.static('<path to your angular app>'));


app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello World!'});
   });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000!');
});