import mongoose from "mongoose";

export async function connectDB(){
    try {
        if(!process.env.MONGO_URI) throw new Error("please enter a mongodb uri")
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection ;
        connection.on('open', () => {
            console.log("mongodb connected ")
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit(1);
        })
    } catch (error) {
        console.log("something went wrong ",error);
    }
}