import { NextFunction, Request as ExpressRequest, Response as ExpressResponse, Router } from "express";

import health from "./health/router";

type Route = {
  path: string;
  router: Router;
};

type Request<T> = T & ExpressRequest;
type Response<P> = P & ExpressResponse;

export type RouteFunction<T = {}, P = {}> = (req: Request<T>, res: Response<P>, next: NextFunction) => void;

const routes: Route[] = [{ path: "/health", router: health }];

export default routes;
