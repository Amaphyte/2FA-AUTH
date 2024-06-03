const mongoose = require('mongoose')


const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to Database')
    } catch (error) {
        console.error({message: 'Failed to connected to Database'})
        process.exit(1)
    }
};


module.exports = connectDB;