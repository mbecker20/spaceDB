import StateSaver from '../schema/StateSaver'

export interface Save {
  saveName: string,
  state: any,
}

class SaveService {
  async find() {
    // get array of all save names
    console.log('bitch fuck')
    return StateSaver.find({}, 'saveName').exec().then(saveNames => {
      return saveNames.map(doc => {
        return doc.get('saveName')
      })
    })
  }

  async get(saveName: string) {
    // id is savename, return the saved redux state
    console.log('restoring space')
    return StateSaver.findOne({ saveName }).exec()
      .then((save: any) => save.state)
  }

  async create(save: Save) {
    // insert a save into the main database saves collection
    console.log(`creating ${save.saveName}`)
    StateSaver.create(save, (err: any, save: any) => {
      if (err) throw err
      console.log(save.id)
    })
    return 'submitted'
  }

  async update(saveName: string, state: any) {
    //StateSaver.replaceOne({ saveName }, { saveName, state })
    console.log(`updating ${saveName}`)
    StateSaver.deleteOne({ saveName }).exec()
    StateSaver.create({ saveName, state }, (err: any, save: any) => {
      if (err) throw err
    })
    return 'submitted'
  }

  async remove(saveName: string) {
    console.log(`deleting ${saveName}`)
    return StateSaver.deleteOne({ saveName }).exec().then(() => {
      return 'deleted'
    })
  }
}

export default SaveService