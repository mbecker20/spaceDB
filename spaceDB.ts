import feathers, { NullableId, Params } from '@feathersjs/feathers'
import express from '@feathersjs/express'
import cors from 'cors'
import { StateSaver } from './setupMongoose'
import mong from 'mongoose'
import createServer from './startServor'
//import service from 'feathers-mongoose'

/*

this server exposes an api for the space machine to interact with the rethinkDB backend

*/

mong.connect('mongodb://localhost/main', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mong.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('mongoose n shit connecto')
});

export interface Save {
  saveName: string,
  state: any,
}

class SaveService {
  async find(params?: Params) {
    // get array of all save names
    console.log('bitch fuck')
    return StateSaver.find({}, 'saveName').exec().then((saveNames) => {
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

  async update(saveName: string, state: any, params: Params) {
    //StateSaver.replaceOne({ saveName }, { saveName, state })
    console.log(`updating ${saveName}`)
    StateSaver.deleteOne({ saveName }).exec()
    StateSaver.create({ saveName, state }, (err: any, save: any) => {
      if (err) throw err
    })
    return 'submitted'
  }
  
  async patch(id: NullableId, data: any, params: Params) { }

  async remove(saveName: string, params: Params) {
    console.log(`deleting ${saveName}`)
    return StateSaver.deleteOne({ saveName }).exec().then(() => {
      return 'deleted'
    })
  }
}
// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

// Express middleware to parse HTTP JSON bodies
app.use(express.json());
// Express middleware to parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Add REST API support
app.configure(express.rest());
// Express middleware with a nicer error handler
app.use(express.errorHandler());
// Hopefully handles the cors error
app.use(cors())

// Register save service
app.use('spaceDB-save-service', new SaveService());

app.service('spaceDB-save-service').on('created', (save: any) => {
  
});

app.listen(30300).on('listening', () =>
  console.log('spaceDB server listening on localhost:30300')
);

createServer();


 




