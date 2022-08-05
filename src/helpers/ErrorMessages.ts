import { ValidationError } from './ValidationError'

export const requiredMessage = 'Required field'
export const invalidEmailMessage = 'Invalid e-mail'
export const uniqueMessage = (resource: string): string => { return `${resource} already in use` }

export const resourceNotFound = (resource: string): Error => {
  return new ValidationError(`${resource} not found`)
}

export const fieldSizeMessage = (min?: number | null, max?: number): string => {
  if (min && max) {
    return `Field needs to be between ${min} and ${max} characters long`
  }
  if (min) {
    return `Field needs to be at least ${min} characters long`
  }
  if (max) {
    return `Field needs to be less than ${max} characters long`
  }
  return ''
}
