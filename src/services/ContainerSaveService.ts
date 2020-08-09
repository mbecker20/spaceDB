import ContainerSaver from '../schema/ContainerSaver'

export interface ContainerSave {
  saveName: string,
  containerID: string,
  modules: any,
  connections: any,
}

class ContainerSaveService {
  async find() {
    // get array of all conatainer save names
    console.log('finding container saves')
    return ContainerSaver.find({}, 'saveName').exec().then(names => {
      return names.map(doc => {
        return doc.get('saveName')
      })
    })
  }

  async get(saveName: string) {
    // return saved container containerID / modules / connections
    console.log('restoring space')
    return ContainerSaver.findOne({ saveName }).exec()
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
    console.log(`creating container ${save.saveName}`)
    ContainerSaver.create(save, (err: any, save: any) => {
      if (err) throw err
    })
    return 'submitted'
  }

  async update(saveName: string, containerSave: ContainerSave) {
    //StateSaver.replaceOne({ saveName }, { saveName, state })
    console.log(`updating ${name}`)
    ContainerSaver.deleteOne({ saveName }).exec()
    ContainerSaver.create(containerSave, (err: any) => {
      if (err) throw err
    })
    return 'submitted'
  }

  async remove(saveName: string) {
    console.log(`deleting ${saveName}`)
    return ContainerSaver.deleteOne({ saveName }).exec().then(() => {
      return 'deleted'
    })
  }
}

export default ContainerSaveService