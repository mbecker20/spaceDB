import feathers, { Service, Id, NullableId, Params } from '@feathersjs/feathers'
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

connect({ host: 'localhost', port: 28015 }, (err, conn) => {
  if (err) throw err
  window.rethinkDBConnection = conn
})

class SaveService implements Service<any> {
  saveNames: string[] = []
  async find(params: Params) { }
  async get(id: Id, params: Params) { }
  async create(data: any, params: Params) {
    
  }
  async update(id: NullableId, data: any, params: Params) { }
  async patch(id: NullableId, data: any, params: Params) { }
  async remove(id: NullableId, params: Params) { }
}



