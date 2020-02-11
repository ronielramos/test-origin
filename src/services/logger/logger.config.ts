import log4js, { Logger } from 'log4js'

const logConfiguration: log4js.Configuration = {
  appenders: {
    production: { type: 'console' },
    development: { type: 'console' }
  },
  categories: {
    production: { appenders: ['production'], level: 'error' },
    default: { appenders: ['development'], level: 'debug' }
  }
}

log4js.configure(logConfiguration)

export const getDefaultLogger = (name: string): Logger => log4js.getLogger(name)
