import mongoose from 'mongoose';

const connectDB = () => {
    mongoose.connect(process.env.MONGO_DB_URI)
    .then(()=> {
        console.log("connected to the database")
    })
    .catch((err)=> {
        console.log("Error in connecting to the database", err)
    })
}

export default connectDB