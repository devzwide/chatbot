import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_CONN_STR;
const mongoClient = new MongoClient(uri);

const connectToDatabase = async () => {
    try {
        await mongoClient.connect();
        const db = mongoClient.db("chatbotDB");
        return db;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectToDatabase;
