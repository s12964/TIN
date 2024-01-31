const path = require('path')
const express = require('express')

const server = express()

server.use('/', express.static(path.resolve(__dirname, 'static')))

server.listen(8080, () => {
  console.log('server started')
})