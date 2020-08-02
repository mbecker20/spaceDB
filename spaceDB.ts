import feathers, { NullableId, Params } from '@feathersjs/feathers'
import express from '@feathersjs/express'
import cors from 'cors'
import Save from './setupMongoose'
import service from 'feathers-mongoose'

/*

this server exposes an api for the space machine to interact with the rethinkDB backend

*/

// set up mongo connection
// -----------------------

const url = 'mongodb://localhost:27017';

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
app.use('spaceDB-save-service', service({ Model: Save }));

app.service('spaceDB-save-service').on('created', (save: any) => {
  
});

app.listen(30300).on('listening', () =>
  console.log('spaceDB server listening on localhost:30300')
);


 




