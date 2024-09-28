// utils/db.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
  constructor() {
    // Retrieve environment variables or use defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB connection URL
    const url = `mongodb://${host}:${port}`;
    
    // Initialize the client and connect to the database
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.db = null;

    // Connect to MongoDB
    this.client.connect()
      .then((client) => {
        this.db = client.db(database);
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
      });
  }

  // Method to check if the connection to MongoDB is alive
  isAlive() {
    return this.client && this.client.isConnected();
  }

  // Method to get the number of documents in the 'users' collection
  async nbUsers() {
    if (!this.db) return 0;
    const usersCollection = this.db.collection('users');
    return usersCollection.countDocuments();
  }

  // Method to get the number of documents in the 'files' collection
  async nbFiles() {
    if (!this.db) return 0;
    const filesCollection = this.db.collection('files');
    return filesCollection.countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
