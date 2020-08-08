import ProjectSaver from '../schema/StateSaver'

export interface ProjectSave {
  name: string,
  state: any,
}

class ProjectSaveService {
  async find() {
    // get array of all save names
    console.log('bitch fuck')
    return ProjectSaver.find({}, 'name').exec().then(names => {
      return names.map(doc => {
        return doc.get('name')
      })
    })
  }

  async get(name: string) {
    // id is savename, return the saved redux state
    console.log('restoring space')
    return ProjectSaver.findOne({ name }).exec()
      .then((save: any) => save.state)
  }

  async create(save: ProjectSave) {
    // insert a save into the main database saves collection
    console.log(`creating ${save.name}`)
    ProjectSaver.create(save, (err: any) => {
      if (err) throw err
    })
    return 'created'
  }

  async update(name: string, state: any) {
    //StateSaver.replaceOne({ saveName }, { saveName, state })
    console.log(`updating ${name}`)
    ProjectSaver.deleteOne({ name }).exec()
    ProjectSaver.create({ name, state }, (err: any) => {
      if (err) throw err
    })
    return 'updated'
  }

  async remove(name: string) {
    console.log(`deleting ${name}`)
    ProjectSaver.deleteOne({ name }).exec()
    return 'deleted'
  }
}

export default ProjectSaveService