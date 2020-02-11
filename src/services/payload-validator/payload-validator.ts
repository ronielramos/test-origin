import Joi = require('@hapi/joi')

export const validatePayload = <Return>(body: unknown, schema: Joi.ObjectSchema): Return => {
  const validation = schema.validate(body)
  if (validation.error) throw validation.error

  return body as Return
}
