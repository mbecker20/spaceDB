import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

const saveSchema = new mongoose.Schema({
  _id: String,
  state: {},
})

saveSchema.methods.getID = function() {
  return this._id ? this._id : 'UNDEFINED' 
}

export const Save = mongoose.model('Save', saveSchema)
