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

app.post('/api/database/update', (req, res) => {
    const { ID, Data, DataSet } = req.body;
    if (String(DataSet)=="Dyr"){
        try {
            const query = database.prepare('UPDATE Dyr SET Name = ?, Description = ?, Personality = ?, WeightMaleMin = ?, WeightMaleMax = ?, WeightFemaleMin = ?, WeightFemaleMax = ?, Height = ?, Speed = ?, YoungMin = ?, YoungMax = ?, In_Zoo = Yes WHERE ID = ?');
            query.run(Data.Name,Data.Description,Data.Personality,Data.WeightMaleMin,Data.WeightMaleMax,Data.WeightFemaleMin,Data.WeightFemaleMax,Data.Height,Data.Speed,Data.YoungMin,Data.YoungMax,ID);
            res.status(200).send({ message: 'Dyr Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Dyr Database', details: error.message });
        }
    }
    else if(String(DataSet)=="Personale"){
        try {
            const query = database.prepare('UPDATE Personale SET Username = ?, Password = ?, FirstName = ?, LastName = ?, Mail = ?, Job = ?, WHERE ID = ?');
            query.run(Data.Username,Data.Password,Data.FirstName,Data.LastName,Data.Mail,Data.Job,ID);
            res.status(200).send({ message: 'Personale Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Personale Database', details: error.message });
        }
    }
    else if(String(DataSet)=="Beskeder"){
        try {
            const query = database.prepare('UPDATE Beskeder SET Title = ?, Category = ?, Sender = ?, Reciever = ? WHERE ID = ?');
            query.run(Data.Title,Data.Category,Data.Sender,Data.Reciever,ID);
            res.status(200).send({ message: 'Beskeder Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder Database' });
        }
    }
    else if(String(DataSet)=="Events"){
        try {
            const query = database.prepare('UPDATE Events SET Name = ?, Dato = ?, StartTime = ?, Info = ? WHERE ID = ?');
            query.run(Data.Name,Data.Dato,Data.StartTime,Data.Info,ID);
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
    const {Data, DataSet} = req.body;
    if (String(DataSet)=="Dyr"){
        try {
            const query = database.prepare('INSERT INTO Dyr (Name, Description, Personality, WeightMaleMin, WeightMaleMax, WeightFemaleMin, WeightFemaleMax, Height, Speed, YoungMin, YoungMax, In_Zoo');
            query.run(Data.Name,Data.Description,Data.Personality,Data.WeightMaleMin,Data.WeightMaleMax,Data.WeightFemaleMin,Data.WeightFemaleMax,Data.Height,Data.Speed,Data.YoungMin,Data.YoungMax,"Yes");
            res.status(200).send({ message: 'Dyr Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Dyr Database', details: error.message });
        }
    }
    else if (String(DataSet)=="Personale"){
        try {
            const query = database.prepare('INSERT INTO Personale (Username, Password, FirstName, LastName, Mail, Job) VALUES (?, ?, ?, ?, ?, ?)')
            query.run(Data.Username,Data.Password,Data.FirstName,Data.LastName,Data.Mail,Data.Job);
            res.status(200).send({ message: 'Personale Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Personale Database', details: error.message });
        }
    }
    else if (String(DataSet)=="Beskeder"){
        try {
            const query = database.prepare('INSERT INTO Beskeder (Title, Category, Sender, Reciever) VALUES (?, ?, ?, ?)')
            query.run(Data.Title,Data.Category,Data.Sender,Data.Reciever);
            res.status(200).send({ message: 'Beskeder Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder Database' });
        }
    }
    else if (String(DataSet)=="Events"){
        try {
            const query = database.prepare('INSERT INTO Events (Name, Dato, StartTime, Info) VALUES (?, ?, ?, ?)')
            query.run(Data.Name,Data.Dato,Data.StartTime,Data.Info);
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


app.use(express.static('<path to your angular app>'));
app.use(express.json());


app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello World!'});
   });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000!');
});