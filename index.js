import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import studentRoutes from './routes/studentRoutes.js';

const atlas_string = process.env.MONGO_URI;

mongoose.connect(atlas_string)
    .then(() => console.log('MongoDB Connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

const app = express();
const port = process.env.PORT || 5555;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is active like a thief in the night');
});

app.use('/students', studentRoutes);

app.use((err, req, res, next) => {
  console.error('UPLOAD ERROR:', err);
  res.status(500).json({ message: err.message || 'Something went wrong' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});