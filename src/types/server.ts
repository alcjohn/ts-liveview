import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { IncomingMessage, ServerResponse } from 'http'

export { Server } from 'http'

export { IncomingMessage } from 'http'

export type Request = ExpressRequest & IncomingMessage
export type Response = ExpressResponse & ServerResponse

export type App = {
  use: (
    route: string,
    f: (req: Request, res: Response, next: () => any) => any,
  ) => any
}
