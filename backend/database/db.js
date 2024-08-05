// Database connection configuration
import mongoose from "mongoose";
import dotenv from "dotenv"
//import seedTestCases from "./seedTestCases.js"
dotenv.config({ path: '../.env' })

const DBConnection = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI

        await mongoose.connect(MONGO_URI)
        console.log('MongoDB connected successfully')
        //seed the database after the connection
        //await seedTestCases()
    } catch (error) {
        console.log('Error while connecting to MongoDB: ', error.message);
        process.exit(1)
    }
}

export default DBConnection