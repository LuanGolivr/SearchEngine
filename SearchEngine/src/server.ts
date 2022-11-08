import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import mustache from 'mustache-express';
import path from 'path';

import {mongoConect} from '../src/database/mongoConnection';
import mainRoutes from '../src/routes/routesIndex';


dotenv.config();

mongoConect();
const server = express();

server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', mustache());

server.use(express.static(path.join(__dirname, '../public')));

//Routes
server.use(mainRoutes);

server.use((req: Request, res: Response)=>{
    res.status(404).send('Error');
});

server.listen(process.env.PORT);