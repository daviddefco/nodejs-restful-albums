import { RequestHandler, Request, Response, NextFunction } from 'express'

export let setHeadersHandler: RequestHandler
setHeadersHandler = function(req: Request, res: Response, next: NextFunction): any {
   res.header('Access-Control-Allow-Origin', '*')
   res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')

   next()
}