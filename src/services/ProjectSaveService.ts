import ProjectSaver, { ProjectSave } from '../schema/ProjectSaver'

class ProjectSaveService {
  async find() {
    // get array of all save names
    console.log('bitch fuck')
    return ProjectSaver.find({}, 'saveName').exec().then(names => {
      return names.map(doc => {
        return doc.get('saveName')
      })
    })
  }

  async get(saveName: string) {
    // id is savename, return the saved redux state
    console.log('restoring space')
    return ProjectSaver.findOne({ saveName }).exec()
      .then((save: any) => save.state)
  }

  async create(save: ProjectSave) {
    // insert a save into the main database saves collection
    console.log(`creating ${save.saveName}`)
    ProjectSaver.create(save, (err: any) => {
      if (err) throw err
    })
    return 'created'
  }

  async update(saveName: string, state: any) {
    //StateSaver.replaceOne({ saveName }, { saveName, state })
    console.log(`updating ${saveName}`)
    ProjectSaver.deleteOne({ saveName }).exec()
    ProjectSaver.create({ saveName, state }, (err: any) => {
      if (err) throw err
    })
    return 'updated'
  }

  async remove(saveName: string) {
    console.log(`deleting ${saveName}`)
    ProjectSaver.deleteOne({ saveName }).exec()
    return 'deleted'
  }
}

export default ProjectSaveService