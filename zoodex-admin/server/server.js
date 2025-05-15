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

app.get('/api/dyr_STORAGE', (req, res) => {
    const query = database.prepare('SELECT * FROM DyrSTORAGE');
    const result = query.all();
    res.send(result);
})

app.get('/api/personale_STORAGE', (req, res) => {
    const query = database.prepare('SELECT * FROM PersonaleSTORAGE')
    const result = query.all();
    res.send(result);
})

app.get('/api/beskeder_STORAGE', (req, res) => {
    const query = database.prepare('SELECT * FROM BeskederSTORAGE');
    const result = query.all();
    res.send(result);
})

app.get('/api/events_STORAGE', (req, res) => {
    const query = database.prepare('SELECT * FROM EventsSTORAGE');
    const result = query.all();
    res.send(result);
})



app.post('/api/database/update', (req, res) => {
    if (req.body.DataSet=="Dyr"){
        try {
            const query = database.prepare('UPDATE Dyr SET Name = ?, Description = ?, Personality = ?, WeightMaleMin = ?, WeightMaleMax = ?, WeightFemaleMin = ?, WeightFemaleMax = ?, Height = ?, Speed = ?, YoungMin = ?, YoungMax = ?, DataSet = ? WHERE ID = ?');
            query.run(req.body.Data.Name,req.body.Data.Description,req.body.Data.Personality,req.body.Data.WeightMaleMin,req.body.Data.WeightMaleMax,req.body.Data.WeightFemaleMin,req.body.Data.WeightFemaleMax,req.body.Data.Height,req.body.Data.Speed,req.body.Data.YoungMin,req.body.Data.YoungMax,req.body.DataSet,req.body.ID);
            res.status(200).send({ message: 'Dyr Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Dyr Database', details: error.message });
        }
    }
    else if(req.body.DataSet=="Personale"){
        try {
            const query = database.prepare('UPDATE Personale SET Username = ?, Password = ?, FirstName = ?, LastName = ?, Mail = ?, Job = ?, DataSet = ? WHERE ID = ?');
            query.run(req.body.Data.Username,req.body.Data.Password,req.body.Data.FirstName,req.body.Data.LastName,req.body.Data.Mail,req.body.Data.Job,req.body.DataSet,req.body.ID);
            res.status(200).send({ message: 'Personale Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Personale Database', details: error.message });
        }
    }
    else if(req.body.DataSet=="Beskeder"){
        try {
            const query = database.prepare('UPDATE Beskeder SET Title = ?, Category = ?, Sender = ?, Reciever = ?, DataSet = ? WHERE ID = ?');
            query.run(req.body.Data.Title,req.body.Data.Category,req.body.Data.Sender,req.body.Data.Reciever,req.body.DataSet,req.body.ID);
            res.status(200).send({ message: 'Beskeder Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder Database' });
        }
    }
    else if(req.body.DataSet=="Events"){
        try {
            const query = database.prepare('UPDATE Events SET Name = ?, Dato = ?, StartTime = ?, Info = ?, DataSet = ? WHERE ID = ?');
            query.run(req.body.Data.Name,req.body.Data.Dato,req.body.Data.StartTime,req.body.Data.Info,req.body.dataSet,req.body.ID);
            res.status(200).send({ message: 'Events Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Events Database' });
        }
    }
    else if(req.body.DataSet=="Dyr-STORAGE"){
        try {
            const query = database.prepare('UPDATE DyrSTORAGE SET Name = ?, Type = ?, Description = ?, Personality = ?, WeightMaleMin = ?, WeightMaleMax = ?, WeightFemaleMin = ?, WeightFemaleMax = ?, Height = ?, Speed = ?, YoungMin = ?, YoungMax = ? WHERE ID = ?');
            query.run(req.body.Data.Name,req.body.Data.Type,req.body.Data.Description,req.body.Data.Personality,req.body.Data.WeightMaleMin,req.body.Data.WeightMaleMax,req.body.Data.WeightFemaleMin,req.body.Data.WeightFemaleMax,req.body.Data.Height,req.body.Data.Speed,req.body.Data.YoungMin,req.body.Data.YoungMax,req.body.ID);
            res.status(200).send({message: 'Dyr-Arkiv Database Updated successfulyy'});
        }
        catch (error) {
            res.status(500).send({ error: 'Failed to update Dyr-Arkiv Database', details: error.message});
        }
    }
    else if(req.body.DataSet=="Personale-STORAGE"){
        try {
            const query = database.prepare('UPDATE PersonaleSTORAGE SET Username = ?, Password = ?, FirstName = ?, LastName = ?, Mail = ?, Job = ? WHERE ID = ?');
            query.run(req.body.Data.Username,req.body.Data.Password,req.body.Data.FirstName,req.body.Data.LastName,req.body.Data.Mail,req.body.Data.Job,req.body.ID);
            res.status(200).send({ message: 'Personale-Arkiv Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Personale-Arkiv Databse', details: error.message});
        }
    }
    else if(req.body.DataSet=="Beskeder-STORAGE"){
        try {
            const query = database.prepare('UPDATE BeskederSTORAGE SET Title = ?, Category = ?, Sender = ?, Reciever = ?, DataSet= ? WHERE ID= ?');
            query.run(req.body.Data.Title,req.body.Data.Category,req.body.Data.Sender,req.body.Data.Reciever,req.body.Data.DataSet,req.body.ID);
            res.status(200).send({ message: 'Beskeder-Arkiv Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to updaqte Beskeder-Arkiv Database'});
        }
    }
    else if(req.body.DataSet=="Events-STORAGE"){
        try {
            const query = database.prepare('UPDATE EventsSTORAGE SET Name = ?, Dato = ?, StartTime = ?, Info = ?, DataSet = ? WHERE ID = ?');
            query.run(req.body.Data.Name,req.body.Data.Dato,req.body.Data.StartTime,req.body.Data.Info,req.body.DataSet,req.body.ID);
            res.status(200).send({ message: 'Events-Arkiv Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Events-Arkiv Database'});
        }
    }

    else {
        res.status(400).send({ error: 'Invalid DataSet' });
    
}});

app.post('/api/database/insert', (req, res) => {
    if (req.body.DataSet=="Dyr"){
        try {
            const query = database.prepare('INSERT INTO Dyr (Name, Type, Description, Personality, WeightMaleMin, WeightMaleMax, WeightFemaleMin, WeightFemaleMax, Height, Speed, YoungMin, YoungMax, DataSet) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            query.run(req.body.Data.Name,req.body.Data.Description,req.body.Data.Personality,req.body.Data.WeightMaleMin,req.body.Data.WeightMaleMax,req.body.Data.WeightFemaleMin,req.body.Data.WeightFemaleMax,req.body.Data.Height,req.body.Data.Speed,req.body.Data.YoungMin,req.body.Data.YoungMax,req.body.DataSet);
            res.status(200).send({ message: 'Dyr Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Dyr Database', details: error.message });
        }
    }
    else if (req.body.DataSet=="Personale"){
        try {
            const query = database.prepare('INSERT INTO Personale (Username, Password, FirstName, LastName, Mail, Job, DataSet) VALUES (?, ?, ?, ?, ?, ?, ?)');
            query.run(req.body.Data.Username,req.body.Data.Password,req.body.Data.FirstName,req.body.Data.LastName,req.body.Data.Mail,req.body.Data.Job,req.body.DataSet);
            res.status(200).send({ message: 'Personale Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Personale Database', details: error.message });
        }
    }
    else if (req.body.DataSet=="Beskeder"){
        try {
            const query = database.prepare('INSERT INTO Beskeder (Title, Category, Sender, Reciever, DataSet) VALUES (?, ?, ?, ?, ?)');
            query.run(req.body.Data.Title,req.body.Data.Category,req.body.Data.Sender,req.body.Data.Reciever, req.body.DataSet);
            res.status(200).send({ message: 'Beskeder Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder Database' });
        }
    }
    else if (req.body.DataSet=="Events"){
        try {
            const query = database.prepare('INSERT INTO Events (Name, Dato, StartTime, Info, DataSet) VALUES (?, ?, ?, ?, ?)');
            query.run(req.body.Data.Name, req.body.Data.Dato, req.body.Data.StartTime, req.body.Data.Info, req.body.DataSet);
            res.status(200).send({ message: 'Events Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Events Database' });
        }
    }
    else if (req.body.DataSet=="Dyr-STORAGE"){
        try {
            const query = database.prepare('INSERT INTO DyrSTORAGE (Name, Type, Description, Personality, WeightMaleMin, WeightMaleMax, WeightFemaleMin, WeightFemaleMax, Height, Speed, YoungMin, YoungMax, DataSet) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            query.run(req.body.Data.Name,req.body.Data.Description,req.body.Data.Personality,req.body.Data.WeightMaleMin,req.body.Data.WeightMaleMax,req.body.Data.WeightFemaleMin,req.body.Data.WeightFemaleMax,req.body.Data.Height,req.body.Data.Speed,req.body.Data.YoungMin,req.body.Data.YoungMax,req.body.DataSet);
            res.status(200).send({ message: 'Dyr-Arkiv Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to updated Dyr-Arkiv Database', details: error.message});
        }
    }
    else if (req.body.DataSet=="Personale-STORAGE"){
        try {
            const query = database.prepare('INSERT INTO PersonaleSTORAGE (Username, Password, FirstName, LastName, Mail, Job, DataSet) VALUES (?, ?, ?, ?, ?, ?, ?)');
            query.run(req.body.Data.Username,req.body.Data.Password,req.body.Data.FirstName,req.body.Data.LastName,req.body.Data.Mail,req.body.Data.Job,req.body.DataSet);
            res.status(200).send({ message: 'Personale-Arkiv Database updated successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Personale-Arkiv Database', details: error.message});
        }
    }
    else if (req.body.DataSet=="Beskeder-STORAGE"){
        try {
            const query = database.prepare('INSERT INTO BeskederSTORAGE (Title, Category, Sender, Reciever, DataSet) VALUES (?, ?, ?, ?, ?)');
            query.run(req.body.Data.Title,req.body.Category,req.body.Sender,req.body.Data.Reciever,req.body.DataSet);
            res.status(200).send({ message: 'Beskeder-Arkiv Database updated Successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder-Arkiv Database'});
        }
    }
    else if (req.body.DataSet=="Events-STORAGE"){
        try {
            const query = database.prepare('INSERT INTO EventsSTORAGE (Name, Dato, StartTime, Info, DataSet) VALUES (?, ?, ?, ?, ?)');
            query.run(req.body.Data.Name, req.body.Data.Dato,req.body.Data.StartTime,req.body.data.Info,req.body.DataSet);
            res.status(200).send({ message: 'Events-Arkiv Database updated Successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Events-Arkiv Database'});
        }
    }

    else {
        res.status(400).send({ error: 'Invalid DataSet' });
    }
})

app.post('/api/database/delete', (req, res) => {
    if (req.body.DataSet=="Dyr"){
        try {
            const query = database.prepare('DELETE FROM Dyr WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Dyr Database entry deleted successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Dyr Database', details: error.message });
        }
    }
    else if (req.body.DataSet=="Personale"){
        try {
            const query = database.prepare('DELETE FROM Personale WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Personale Database entry deleted successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Personale Database', details: error.message });
        }
    }
    else if (req.body.DataSet=="Beskeder"){
        try {
            const query = database.prepare('DELETE FROM Beskeder WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Beskeder Database entry deleted successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder Database' });
        }
    }
    else if (req.body.DataSet=="Events"){
        try {
            const query = database.prepare('DELETE FROM Events WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Events Database entry deleted successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Events Database' });
        }
    }
    else if (req.body.DataSet=="Dyr-STORAGE"){
        try {
            const query = database.prepare('DELETE FROM DyrSTORAGE WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Dyr-Arkiv Database entry deleted successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Dyr-Arkiv Database', details: error.message });
        }
    }
    else if (req.body.DataSet=="Personale-STORAGE"){
        try{
            const query = database.prepare('DELETE FROM PersonaleSTORAGE WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Personale-Arkiv Database entry deleted successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Personale-Arkiv Database'});
        }

    }
    else if (req.body.DataSet=="Beskeder-STORAGE"){
        try {
            const query = database.prepare('DELETE FROM BeskederSTORAGE WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Beskder-Arkiv Databse entry deleted successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder-Arkiv Database'});
        }
    }
    else if (req.body.DataSet=="Events-STORAGE"){
        try {
            const query = database.prepare('DELETE FROM EventsSTORAGE WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Events Database entry deleted successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Events-Arkiv Databse'});
        }

    }
    else {
        res.status(400).send({ error: 'Invalid DataSet' });
    }
})

app.post('/api/database/storage', (req, res) => {
    if (String(req.body.DataSet)=="Dyr"){
        try {
            const query = database.prepare('INSERT INTO DyrSTORAGE (Name, Description, Personality, WeightMaleMin, WeightMaleMax, WeightFemaleMin, WeightFemaleMax, Height, Speed, YoungMin, YoungMax, DataSet) SELECT Name, Description, Personality, WeightMaleMin, WeightMaleMax, WeightFemaleMin, WeightFemaleMax, Height, Speed, YoungMin, YoungMax, DataSet FROM Dyr WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('UPDATE DyrSTORAGE SET DataSet = ? WHERE ID = ?');
            query.run("DyrSTORAGE", req.body.ID);
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
            const query = database.prepare('INSERT INTO PersonaleSTORAGE (Username, Password, FirstName, LastName, Mail, Job) SELECT Username, Password, FirstName, LastName, Mail, Job, DataSet FROM Personale WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('UPDATE PersonaleSTORAGE SET DataSet = ? WHERE ID = ?');
            query.run("PersonaleSTORAGE", req.body.ID);
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
            const query = database.prepare('INSERT INTO BeskederSTORAGE (Title, Category, Sender, Reciever) SELECT Title, Category, Sender, Reciever, DataSet FROM Beskeder WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('UPDATE BeskederSTORAGE SET DataSet = ? WHERE ID = ?');
            query.run("BeskederSTORAGE", req.body.ID);
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
            const query = database.prepare('INSERT INTO EventsSTORAGE (Name, Dato, StartTime, Info) SELECT Name, Dato, StartTime, Info, DataSet FROM Events WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('UPDATE EventsSTORAGE SET DataSet = ? WHERE ID = ?');
            query.run("EventsSTORAGE", req.body.ID);
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
            const query = database.prepare('INSERT INTO Dyr (Name, Description, Personality, WeightMaleMin, WeightMaleMax, WeightFemaleMin, WeightFemaleMax, Height, Speed, YoungMin, YoungMax, DataSet) SELECT Name, Description, Personality, WeightMaleMin, WeightMaleMax, WeightFemaleMin, WeightFemaleMax, Height, Speed, YoungMin, YoungMax, DataSet FROM DyrSTORAGE WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('UPDATE Dyr SET DataSet = ? WHERE ID = ?');
            query.run("Dyr", req.body.ID);
            query = database.prepare('DELETE FROM DyrSTORAGE WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Dyr Database entry retrieved successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Dyr Database', details: error.message });
        }
    }
    else if (String(req.body.DataSet)=="Personale"){
        try {
            const query = database.prepare('INSERT INTO Personale (Username, Password, FirstName, LastName, Mail, Job, DataSet) SELECT Username, Password, FirstName, LastName, Mail, Job, DataSet FROM PersonaleSTORAGE WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('UPDATE Personale SET DataSet = ? WHERE ID = ?');
            query.run("Personale", req.body.ID);
            query = database.prepare('DELETE FROM PersonaleSTORAGE WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Personale Database entry retrieved successfully'});
        }
        catch (error) {
            res.status(500).send({ error: 'Failed to update Personale Database', details: error.message });
        }
    }
    else if (String(req.body.DataSet)=="Beskeder"){
        try {
            const query = database.prepare('INSERT INTO Beskeder (Title, Category, Sender, Reciever, DataSet) SELECT Title, Category, Sender, Reciever, DataSet FROM BeskederSTORAGE WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('UPDATE Beskeder SET DataSet = ? WHERE ID = ?');
            query.run("Beskeder", req.body.ID);
            query = database.prepare('DELETE FROM BeskederSTORAGE WHERE ID = ?');
            query.run(req.body.ID);
            res.status(200).send({ message: 'Beskeder Database entry retrieved successfully'});
        }
        catch (error){
            res.status(500).send({ error: 'Failed to update Beskeder Database' });
        }
    } 
    else if (String(req.body.DataSet)=="Events"){
        try {
            const query = database.prepare('INSERT INTO Events (Name, Dato, StartTime, Info, DataSet) SELECT Name, Dato, StartTime, Info, DataSet FROM EventsSTORAGE WHERE ID = ?');
            query.run(req.body.ID);
            query = database.prepare('UPDATE Events SET DataSet = ? WHERE ID = ?');
            query.run("Events", req.body.ID);
            query = database.prepare('DELETE FROM EventsSTORAGE WHERE ID = ?');
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