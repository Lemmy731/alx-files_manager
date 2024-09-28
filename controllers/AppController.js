// controllers/AppController.js
import redisClient from '../utils/redis';  // Assuming redisClient is set up in utils/redis.js
import dbClient from '../utils/db';        // Assuming dbClient is set up in utils/db.js

class AppController {
    // Handle GET /status
    static async getStatus(req, res) {
        // Check Redis and DB status
        const redisAlive = redisClient.isAlive();
        const dbAlive = dbClient.isAlive();
        
        res.status(200).json({ redis: redisAlive, db: dbAlive });
    }

    // Handle GET /stats
    static async getStats(req, res) {
        // Get number of users and files from MongoDB
        const usersCount = await dbClient.nbUsers();
        const filesCount = await dbClient.nbFiles();
        
        res.status(200).json({ users: usersCount, files: filesCount });
    }
}

export default AppController;
