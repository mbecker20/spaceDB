import feathers, { NullableId, Params } from '@feathersjs/feathers'
import express from '@feathersjs/express'
import cors from 'cors'
import assert from 'assert'
import { MongoClient, Db } from 'mongodb'

/*

this server exposes an api for the space machine to interact with the rethinkDB backend

*/

// set up mongo connection
// -----------------------

const url = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(url);

let db: Db

// Use connect method to connect to the Server
client.connect(function (err: any) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db('main'); // now can use db in feather api

  client.close();
});

// find types
const GET_SAVENAMES = 'GET_SAVENAMES'
const GET_SAVE = 'GET_SAVE'

export interface Save {
  id: string,
  savedState: any,
}


class SaveService {
  async find(params?: Params) {
  }
  
  async get(id: string, params?: Params) { 
    
  }

  async create(save: Save) {
    
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


 




