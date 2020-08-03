//const servor = require('servor')
const https = require('https')
const fs = require('fs')

const options = {
  key: fs.readFileSync('../key.pem'),
  cert: fs.readFileSync('../cert.pem'),
  port: 443,
  path: '/build',
};

function createServer() {
  https.createServer(options, (req: any, res: any) => {
    console.log(req)
    console.log(res)
  }).listen(8000)
}

export default createServer

/* function startServor() {
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

export default startServor */