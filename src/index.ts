import * as http from 'http'
import * as debug from 'debug'
import * as mongoose from 'mongoose'
import * as bluebird from 'bluebird'

import App from './App'

debug('ts-express:server')

const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);
const server = http.createServer(App);

// Definition of bluebird as promise library. Default's library is deprecated
// Must be done before connecting
(<any>mongoose).Promise = bluebird

// MongoDB Connection
let connectionUri = 'mongodb://localhost:27017/nodejs-restful-albums'
let options = { promiseLibrary: bluebird };
let db = mongoose.connect(connectionUri, options, (err) => {
  if(err) {
    throw err
  } else {
    console.log("Connection to MongoDB successfully created")
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  }
})

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Restful API of Albums Listening on ${bind}`);
}
