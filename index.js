import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/user.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3500;
const mongoURI =
  process.env.MONGO_URI ||
  'mongodb://contact-keeper:contact-keeper@ac-rhba26s-shard-00-00.tzngsb5.mongodb.net:27017,ac-rhba26s-shard-00-01.tzngsb5.mongodb.net:27017,ac-rhba26s-shard-00-02.tzngsb5.mongodb.net:27017/?ssl=true&replicaSet=atlas-j5hi52-shard-0&authSource=admin&retryWrites=true&w=majority';

app.use('/api/user', userRoutes);

mongoose
  .connect(mongoURI)
  .then(() => app.listen(port, () => console.log(`Server is running on ${port}`)))
  .catch((err) => {
    console.log(err);
  });