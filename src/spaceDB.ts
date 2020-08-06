import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import cors from 'cors'
import mong from 'mongoose'
import SaveService from './services/SaveService'

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

app.listen(30300).on('listening', () =>
  console.log('spaceDB server listening on localhost:30300')
);


 




