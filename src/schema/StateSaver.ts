import { Schema, model } from 'mongoose'

const saveSchema = new Schema({
  saveName: String,
  state: {},
})

const StateSaver = model('StateSaver', saveSchema)

export default StateSaver

