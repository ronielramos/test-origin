import express from 'express'
import cors, { CorsOptions } from 'cors'
import helmet from 'helmet'
import router from '../risk-profile/risk-profile.controller'

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

app.get('/', (_req, res) => res.end())
app.use(router)

export default app
