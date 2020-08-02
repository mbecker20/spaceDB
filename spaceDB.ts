import feathers, { NullableId, Params } from '@feathersjs/feathers'
import express from '@feathersjs/express'
import cors from 'cors'

/*

this server exposes an api for the space machine to interact with the rethinkDB backend

*/

// set up mongo connection
// -----------------------

const url = 'mongodb://localhost:27017';


export interface Save {
  id: string,
  savedState: any,
}


class SaveService {
  async find(params?: Params) {
    // get array of all save names
  }
  
  async get(id: string, params?: Params) { 
    // id is savename, return the saved redux state
  }

  async create(save: Save) {
    // insert a save into the main database saves collection
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

app.listen(3030).on('listening', () =>
  console.log('spaceDB server listening on localhost:3030')
);


 




