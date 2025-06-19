import { Express } from "express";

import setCors from '../middleware/cors';

const applyMiddleWare = (app: Express): void => {
  app.use(setCors);
}

export default applyMiddleWare;