import dotenv from 'dotenv';
import {connect} from 'mongoose';


dotenv.config();

export const mongoConect = async ()=>{
    try {
        console.log('Connecting to mongoDB');
        await connect(process.env.MONGO_URL as string);
        console.log('Connected sucessfuly');
    }
    catch(error) {
        console.log('Error, we could not connect to MongoDB');
    }
}