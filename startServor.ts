const servor = require('servor')

function startServor() {
  servor({
    root: './space-machine',
    fallback: 'index.html',
    port: 8000,
  }).then(() => {
    console.log('servor started')
  })
}

export default startServor