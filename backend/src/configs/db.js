import mongoose from 'mongoose';
import { globalConfig } from './constants.js'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${globalConfig?.MONGO_URI}/${globalConfig?.DB_NAME}`);
    console.log(`MongoDB connected... : ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
