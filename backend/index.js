import dotenv from 'dotenv'
import app from './src/app.js';
dotenv.config()

import connectDB from './src/db/db.js';
connectDB();

app.get('/', (req, res) => {
    res.send("Server is running");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})
