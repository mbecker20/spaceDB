import feathers, { Id, NullableId, Params } from '@feathersjs/feathers'
import express from '@feathersjs/express'
import { connect, Connection, db } from 'rethinkdb'

/*

this server exposes an api for the space machine to interact with the rethinkDB backend

*/

declare global {
  interface Window {
    rethinkDBConnection: Connection
  }
}

interface Save {
  id: string,
  savedState: any,
}

connect({ host: 'localhost', port: 28015 }, (err, conn) => {
  if (err) throw err
  window.rethinkDBConnection = conn
})

class SaveService {
  saveNames: string[] = []
  async find(params?: Params) { 
    let res: string | string[] = 'fail'
    db('main').table('saves').pluck('id').run(window.rethinkDBConnection, (err, saveCursor) => {
      if (err) throw err;
      saveCursor.toArray().then(saveNames => {
        res = saveNames
      })
    })
    console.log(res)
  }
  async get(id: Id, params: Params) { }

  async create(save: Save, params?: Params) {
    let res = 'ok!'
    db('main').table('saves').insert({
      id: save.id,
      state: save.savedState
    }).run(window.rethinkDBConnection, err => {
      if (err) {
        res = 'not ok :('
        throw err
      }
    })
    return res
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

// Register save service
app.use('spaceDB-save-service', new SaveService());

app.service('spaceDB-save-service').on('created', (save: Save) => {
  console.log(`saved ${save.id}`)
});

app.listen(3030).on('listening', () =>
  console.log('spaceDB server listening on localhost:3030')
);

app.service('spaceDB-save-service').find()



