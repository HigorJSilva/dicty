/* eslint-disable prefer-promise-reject-errors */
import { Model } from 'mongoose'

export async function exists (value: string, model: Model<any>, key: string): Promise<boolean> {
  const result = await model.find().where({ [key]: value })
  if (result.length < 1) {
    return await Promise.reject()
  }
  return true
}
