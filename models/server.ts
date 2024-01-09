import 'dotenv/config';
import * as express from "express";
import { dbConnection } from '../database/config';
import cors from "cors";

export class Server {
  private app: express.Application;
  private port: number | string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    // Connect to database
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.app.use( "/api/products",  )
  } 

  async connectDB() {
    await dbConnection();
  }

  middlewares() {

    // CORS
    this.app.use( cors() );

    // Body parsing
    this.app.use( express.json );

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}