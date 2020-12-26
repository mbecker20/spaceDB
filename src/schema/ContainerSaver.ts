import { Schema, model } from 'mongoose'

export interface ContainerSave {
  saveName: string,
  containerID: string,
  modules: any,
  connections: any,
}

const containerSaveSchema = new Schema({
  saveName: String,
  containerID: String,
  modules: {},
  connections: {},
})

const ContainerSaver = model('Container', containerSaveSchema)

export default ContainerSaver