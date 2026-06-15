import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log('MongoDB Connected');
    }catch(e){
        console.error('MongoDB Connection Error:', e);
        process.exit(1)
    }

}

export default connectMongoDB;



