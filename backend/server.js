import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import chalk from 'chalk'

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'

import connectToMongoDB from './db/connectToMongoDB.js'
import { app, server } from './socket/socket.js'

const PORT = process.env.PORT || 5000

const __dirname = path.resolve() // перед деплоем

dotenv.config()

app.use(express.json()) // для анализа входящих запросов с полезными данными JSON (из req.body)
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist'))) // middleware перед деплоем

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html')) // перед деплоем
})

server.listen(PORT, () => {
  connectToMongoDB()
  console.log(chalk.bgBlue(`Server Running on port ${PORT}`))
})
