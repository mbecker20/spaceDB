import { Schema, model } from 'mongoose'

const saveSchema = new Schema({
  _id: String,
  save: {
    name: String,
    state: {},
  },
})

saveSchema.methods.getID = function() {
  return this._id ? this._id : 'UNDEFINED' 
}

export const StateSaver = model('StateSaver', saveSchema)
