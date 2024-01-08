import 'dotenv/config';
import * as express from "express";
import { dbConnection } from '../database/config';

export class Server {
  private app: express.Application;
  private port: number | string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    // Connect to database
    this.connectDB();
  } 

  async connectDB() {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}