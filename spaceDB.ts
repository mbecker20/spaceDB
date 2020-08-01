import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import { connect, Connection } from 'rethinkdb'

declare global {
  interface Window {
    rethinkDBConnection: Connection
  }
}

connect({ host: 'localhost', port: 28015 }, (err, conn) => {
  if (err) throw err
  window.rethinkDBConnection = conn
})

