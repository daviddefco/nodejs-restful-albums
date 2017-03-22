// import * as path from 'path';
import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'

import Routes from './routes/Routes'
import * as HeadersHandler from './middleware/HeadersHandler'

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))  
    // This middleware is built to deal with CORS and resource access policies
    // to avoid problems when dealing with PUT and DELETE requests from 
    // AJAX calls
    this.express.use(HeadersHandler.setHeadersHandler)
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/', Routes);
  }
}

export default new App().express;
