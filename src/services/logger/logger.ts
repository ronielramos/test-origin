import { configure, getLogger, Logger, Configuration } from 'log4js'

const logConfiguration: Configuration = {
  appenders: {
    production: { type: 'console' },
    development: { type: 'console' }
  },
  categories: {
    production: { appenders: ['production'], level: 'error' },
    default: { appenders: ['development'], level: 'debug' }
  }
}

configure(logConfiguration)

const normalizeMessage = (message: ErrorMessage): string => {
  if (message == null) return 'no error details'
  if (message instanceof Error) return `${message.message}\n${message.stack}`
  if (typeof message === 'string') return message
  if (typeof message === 'object') return JSON.stringify(message, null, 4)
  return 'message have a undefined format'
}

type ErrorMessage = string | Error | object | null | {} | undefined

export const logFatal = (message: ErrorMessage, logger: Partial<Logger> = getLogger('development')): void => {
  if (logger.fatal) return logger.fatal(normalizeMessage(message))
  console.error('Doesn\'t exist a fatal method on logger! Using a default console.error', message)
}

export const logError = (message: ErrorMessage, logger: Partial<Logger> = getLogger('development')): void => {
  if (logger.error) return logger.error(normalizeMessage(message))
  console.error('Doesn\'t exist a error method on logger! Using a default console.error', message)
}

export const logWarn = (message: ErrorMessage, logger: Partial<Logger> = getLogger('development')): void => {
  if (logger.warn) return logger.warn(normalizeMessage(message))
  console.warn('Doesn\'t exist a warn method on logger! Using a default console.warn', message)
}

export const logDebug = (message: ErrorMessage, logger: Partial<Logger> = getLogger('development')): void => {
  if (logger.debug) return logger.debug(normalizeMessage(message))
  console.debug('Doesn\'t exist a debug method on logger! Using a default console.debug', message)
}
