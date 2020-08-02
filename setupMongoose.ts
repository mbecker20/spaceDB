import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

const saveSchema = new mongoose.Schema({
  id: String,
  state: {},
})

saveSchema.methods.getID = function() {
  const id = this.id ? this.id : 'UNDEFINED' 
}

id.save(function (err: {}, id: String) {
  if (err) return console.error(err)
  id.getID()
}) 

const Save = mongoose.model('Save', saveSchema)