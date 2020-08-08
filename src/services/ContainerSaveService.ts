import ContainerSaver from '../schema/StateSaver'

export interface ContainerSave {
  name: string,
  containerID: string,
  modules: any,
  connections: any,
}

class ProjectSaveService {
  async find() {
    // get array of all conatainer save names
    console.log('finding container saves')
    return ContainerSaver.find({}, 'name').exec().then(names => {
      return names.map(doc => {
        return doc.get('name')
      })
    })
  }

  async get(name: string) {
    // return saved container containerID / modules / connections
    console.log('restoring space')
    return ContainerSaver.findOne({ name }).exec()
      .then((save: any) => {
        return {
          containerID: save.containerID,
          modules: save.modules,
          connections: save.connections,
        }
      })
  }

  async create(save: ContainerSave) {
    // insert a save into the main database saves collection
    console.log(`creating container ${save.name}`)
    ContainerSaver.create(save, (err: any, save: any) => {
      if (err) throw err
    })
    return 'submitted'
  }

  async update(name: string, containerSave: ContainerSave) {
    //StateSaver.replaceOne({ saveName }, { saveName, state })
    console.log(`updating ${name}`)
    ContainerSaver.deleteOne({ name }).exec()
    ContainerSaver.create(containerSave, (err: any) => {
      if (err) throw err
    })
    return 'submitted'
  }

  async remove(name: string) {
    console.log(`deleting ${name}`)
    return ContainerSaver.deleteOne({ name }).exec().then(() => {
      return 'deleted'
    })
  }
}

export default ProjectSaveService