import { Schema, model } from 'mongoose'

const containerSaveSchema = new Schema({
  name: String,
  containerID: String,
  modules: {},
  connections: {},
})

const ContainerSaver = model('Container', containerSaveSchema)

export default ContainerSaver