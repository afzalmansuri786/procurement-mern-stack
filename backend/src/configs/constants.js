import dotenv from 'dotenv'
dotenv.config();

export const globalConfig = {
    MONGO_URI: process.env.DB_URI,
    DB_NAME: process?.env?.DB_NAME,
    PORT: process?.env?.PORT
    
}