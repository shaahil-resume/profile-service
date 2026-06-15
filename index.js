import express from 'express'
import dotenv from 'dotenv'
import connectMongoDB from "./src/config/mongodb.config.js";
import { connectRedis } from './src/config/redis.config.js'
import profileRoutes from './src/routes/profile.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3002

app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        service: 'profile-service',
        timestamp: new Date().toISOString()
    })
})

const startServer = async () => {
    try{

        await connectMongoDB();
        await connectRedis();
        console.log('MongoDB connected')
        console.log('Redis connected')

        app.use('/api/profile', profileRoutes)

        app.listen(PORT, () => {
            console.log(`Profile service running on port ${PORT}`)
        })
    }catch (error) {
        console.error('Failed to start:', error)
        process.exit(1)
    }


}

startServer();