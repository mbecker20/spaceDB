const servor = require('servor')

function startServor() {
  servor({
    root: './space-machine',
    fallback: 'index.html',
    module: false,
    static: false,
    reload: false,
    port: 8000,
  }).then(() => {
    console.log('space machine servor started. connect on 192.169.1.81:8000')
  })
}

export default startServor