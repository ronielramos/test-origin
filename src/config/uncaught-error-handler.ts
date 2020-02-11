import { Server } from 'http'
import { logFatal } from '../services/logger/logger'

export const terminate = (server: Server, error: Error | {} | null | undefined, options = { timeout: 3000 }): void => {
  logFatal(error)

  const exit = (code: number): void => process.exit(code)

  server.close()
  setTimeout(exit, options.timeout)
}
