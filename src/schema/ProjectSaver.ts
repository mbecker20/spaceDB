import { Schema, model } from 'mongoose'

export interface ProjectSave {
  saveName: string,
  state: any,
}

const projectSaveSchema = new Schema({
  saveName: String,
  state: {},
})

const ProjectSaver = model('Project', projectSaveSchema)

export default ProjectSaver

