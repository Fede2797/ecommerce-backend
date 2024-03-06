import 'dotenv/config';
import * as express from "express";
import * as cors from "cors";
import { dbConnection } from '../database/config';
import { router as productRouter } from "../routes/products";
import * as bodyParser from "body-parser";

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
    this.app.use( "/api/products", productRouter );
  } 

  async connectDB() {
    await dbConnection();
  }

  middlewares() {

    // CORS
    const corsOptions = {
      origin: 'https://ecommerce-frontend-two-tau.vercel.app/',
      optionsSuccessStatus: 200,
    };

    this.app.use( cors(corsOptions) );

    // Body parsing
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Urbaneer backend listening on port ${this.port}`);
    });
  }
}