import mongoose from "mongoose";

const connDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connected Successfully: ${mongoose.connection.host}`)
    }
    catch(e){
        console.log("Database Connection Error: \n", e)
    }
}
export default connDb;