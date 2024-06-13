const mongoose = require('mongoose');
const routes=require('./Routes/chatRouter.js')
const cors=require('cors');
const express=require('express')
const app=express()
app.use(cors());
app.use(express.json())
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://mohangokul4469:Gokul%402002@chatdata.pdmg8i8.mongodb.net/chats123db?retryWrites=true&w=majority&appName=ChatData'
        );
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
app.use("/api", routes);
app.listen (3000, ()=>
{
    console.log('App is running');
})
connectDB();
