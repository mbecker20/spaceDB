import feathers, { Id, NullableId, Params } from '@feathersjs/feathers'
import express from '@feathersjs/express'
import { connect, Connection, db } from 'rethinkdb'
import cors from 'cors'

/*

this server exposes an api for the space machine to interact with the rethinkDB backend

*/

// find types
const GET_SAVENAMES = 'GET_SAVENAMES'
const GET_SAVE = 'GET_SAVE'

interface Save {
  id: string,
  savedState: any,
}

let rethinkDBConnection: Connection

class SaveService {
  async find(params?: Params) {
    return db('main').table('saves').pluck('id').run(rethinkDBConnection)
    .then(cursor => cursor.toArray())
    .then(nameArray => nameArray.map(nameObj => nameObj.id))
  }

  async get(id: string, params?: Params) { 
    return db('main').table('saves').get(id).run(rethinkDBConnection)
    .then((doc: any) => doc.state )
  }

  async create(save: Save) {
    let res: any = 'ok!'
    db('main').table('saves').insert({
      id: save.id,
      state: save.savedState
    }).run(rethinkDBConnection, (err, save) => {
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
// Hopefully handles the cors error
app.use(cors())

// Register save service
app.use('spaceDB-save-service', new SaveService());

app.service('spaceDB-save-service').on('created', (save: any) => {
  if (save !== 'not ok :(') {
    console.log(`saved`)
    console.log(save)
  } else {
    console.log(save)
  }
});

app.listen(3030).on('listening', () =>
  console.log('spaceDB server listening on localhost:3030')
);


connect({ host: 'localhost', port: 28015 }, (err, conn) => {
  if (err) {
    console.log('fail')
    throw err
  }
  rethinkDBConnection = conn
})





