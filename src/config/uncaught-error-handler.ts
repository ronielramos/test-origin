import { Server } from 'http'

export const terminate = (server: Server, error: Error | {} | null | undefined, options = { timeout: 3000 }): void => {
  console.error(error)

  const exit = (code: number): void => process.exit(code)

  server.close()
  setTimeout(exit, options.timeout)
}
