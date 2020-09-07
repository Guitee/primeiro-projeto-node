// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from './appointmens.routes';

const routes = Router();
// use funciona para qualquer tipo de rota
routes.use('/appointments', appointmentsRouter);

export default routes;
