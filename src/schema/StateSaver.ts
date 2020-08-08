import { Schema, model } from 'mongoose'

const projectSaveSchema = new Schema({
  name: String,
  state: {},
})

const ProjectSaver = model('Project', projectSaveSchema)

export default ProjectSaver

