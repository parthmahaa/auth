import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.mongo_url!)
        const connection = mongoose.connection

        connection.on('connected', ()=> {
            console.log("MongoDB connected");
        })
        connection.on('error' ,(e)=>{
            console.log("MongoDB connection error" ,+e );
            process.exit()
        })
    } catch (error) {
        console.log("Something went wrong");
    }
}