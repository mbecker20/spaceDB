

const saveSchema = new mongoose.Schema({
  _id: String,
  save: {
    name: String,
    state: {},
  },
})

saveSchema.methods.getID = function() {
  return this._id ? this._id : 'UNDEFINED' 
}

export const Save = mongoose.model('Save', saveSchema)
