const servor = require('servor')
const fs = require('fs')

const credentials = {
  key: fs.readFileSync('../key.pem'),
  cert: fs.readFileSync('../cert.pem'),
};

console.log(`key: ${credentials.key}`)
console.log(`cert: ${credentials.cert}`)

function startServor() {
  servor({
    root: './space-machine',
    fallback: 'index.html',
    module: false,
    static: false,
    reload: false,
    credentials, 
    port: 8000,
  }).then(() => {
    console.log('space machine servor started. connect at https://192.169.1.81:8000')
  })
}

export default startServor