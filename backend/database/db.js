const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DBConnections = async ()=>{
    const MONGODB_URL = process.env.MONGODB_URL;
    try{
        await mongoose.connect(MONGODB_URL, {useNewUrlParser:true});
        console.log("DB Connections established!");
    } catch(error){
        console.log("Error connecting to MongoDB: "+error)
    }
};

module.exports = {DBConnections};
//dynamic and defualt inputs