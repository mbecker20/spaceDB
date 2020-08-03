import feathers, { NullableId, Params } from '@feathersjs/feathers'
import express from '@feathersjs/express'
import cors from 'cors'
import { StateSaver } from './setupMongoose'
import mongoose from 'mongoose'
//import service from 'feathers-mongoose'

/*

this server exposes an api for the space machine to interact with the rethinkDB backend

*/

mongoose.connect('mongodb://localhost/main', { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('mongoose n shit connecto')
});

export interface Save {
  name: string,
  state: any,
}

class SaveService {
  async find(params?: Params) {
    // get array of all save names
    console.log('bitch fuck')
    return ['yes', 'ok']
  }

  async get(id: string, params?: Params) {
    // id is savename, return the saved redux state
  }

  async create(save: Save) {
    // insert a save into the main database saves collection
    StateSaver.create(save, (err: any, save: any) => {
      if (err) throw err
      console.log(save.id)
    })
    return 'submitted'
  }

  async update(id: NullableId, data: any, params: Params) { }
  async patch(id: NullableId, data: any, params: Params) { }
  async remove(id: NullableId, params: Params) { }
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


 




