import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'
dotenv.config()
const {
    DB_USER, DB_PASSWORD
  } = process.env;

const app = express();


app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));
// first we specify the use of cors and then the use of routes
app.use(cors());
// prefix for all routes in posts.js
app.use('/posts', postRoutes);

const CONNECTION_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mgqpa.mongodb.net/myFirstDatabase?retryWrites=true&w=majorityz`;

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true}) // connnections and options inside an object
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)
