const express = require('express');
const mongoose = require('mongoose');

const atlas_string = "mongodb+srv://anythingprograming_db_user:l79YmhjiyHFmoIlE@cluster0.b9qps9z.mongodb.net/cohort8_db?appName=Cluster0";

mongoose.connect(atlas_string)
    .then(() => console.log('MongoDB Connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

const app = express();
const port = 5555;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is active like a thief in the night');
});

app.use('/students', require('./routes/studentRoutes'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});