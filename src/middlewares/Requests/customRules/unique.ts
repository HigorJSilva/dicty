import { Model } from 'mongoose'

export async function unique (value: string, property: string, model: Model<any>): Promise<boolean> {
  const uniqueCheck = await model.findOne({ [property]: value })
  // eslint-disable-next-line prefer-promise-reject-errors
  return uniqueCheck === null ? true : await Promise.reject()
}
