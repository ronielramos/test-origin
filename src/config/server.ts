import express from 'express'
import cors, { CorsOptions } from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()

const corsOptions: CorsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With'],
  methods: ['POST', 'OPTIONS', 'GET'],
  credentials: true,
  origin: '*'
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())
app.use(morgan('dev'))

app.get('/healthcheck', (_req, res) => res.end())

export default app
