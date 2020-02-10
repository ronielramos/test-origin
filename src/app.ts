import app from './config/server'
import { terminate } from './config/uncaught-error-handler'
import { logDebug } from './services/logger/logger'

const PORT = process.env.PORT ?? 80

const server = app.listen(PORT, () => logDebug('Listening on PORT ' + PORT))

process.on('uncaughtException', (error) => terminate(server, error))
process.on('unhandledRejection', (reason, _promise) => terminate(server, reason))
