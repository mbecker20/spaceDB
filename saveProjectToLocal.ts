import { db, Connection } from 'rethinkdb'
const fs = require('fs')

function saveProjectToLocal(projID: string, rethinkDBConnection: Connection) {
  db('main').table('saves').get(projID).run(rethinkDBConnection)
  .then((save: any) => {
    fs.writeFile(`${projID}.sm`, JSON.stringify(save.state), (err: any) => {
      if (err) throw err

      console.log('file written maybe')
    })
  })
}

export default saveProjectToLocal