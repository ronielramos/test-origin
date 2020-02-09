import app from './config/server'
import { terminate } from './config/error-handler'

const PORT = process.env.PORT ?? 80

const server = app.listen(PORT, () => console.log('Listening on PORT ' + PORT))

process.on('uncaughtException', (error) => terminate(server, error))
process.on('unhandledRejection', (reason, _promise) => terminate(server, reason))
