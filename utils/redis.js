import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        // Create a Redis client
        this.client = redis.createClient();

        // Display any errors
        this.client.on('error', (err) => {
            console.error('Redis client error:', err);
        });

        // Promisify Redis methods to use async/await
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.set).bind(this.client);
        this.delAsync = promisify(this.client.del).bind(this.client);
    }

    // Check if Redis is connected
    isAlive() {
        return this.client.connected;
    }

    // Get the value of a key from Redis
    async get(key) {
        const value = await this.getAsync(key);
        return value;
    }

    // Set a key-value pair in Redis with expiration
    async set(key, value, duration) {
        await this.setAsync(key, value, 'EX', duration);
    }

    // Delete a key from Redis
    async del(key) {
        await this.delAsync(key);
    }
}

// Export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
