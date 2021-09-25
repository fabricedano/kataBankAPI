import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { UserEntity } from './entity/user/user';
import { IndexRoute } from './routes/index/index';
import { UserRoute } from './routes/user/user';
import configurePassport from './config';
import { AccountEntity } from './entity/account/account';
import { AccountRoute } from './routes/account/account';
import { OperationRoute } from './routes/operation/operation';
import { OperationEntity } from './entity/operation/operation';
import { BalanceRoute } from './routes/balance/balance';

class App {
  public app: express.Application;
  public indexRoutes: IndexRoute = new IndexRoute();
  public userRoutes: UserRoute = new UserRoute();
  public accountRoutes: AccountRoute = new AccountRoute();
  public operationRoutes: OperationRoute = new OperationRoute();
  public balanceRoutes: BalanceRoute = new BalanceRoute();

  constructor() {
    this.app = express();
    this.config();
    this.indexRoutes.routes(this.app);
    this.userRoutes.routes(this.app);
    this.accountRoutes.routes(this.app);
    this.operationRoutes.routes(this.app);
    this.balanceRoutes.routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser()); // read cookies (needed for auth)
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    dotenv.config();
    this.connectionConfig();
    this.corsConfig();
    configurePassport(this.app);
    this.viewConfig();
  }

  private viewConfig(): void {
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.use("/src", express.static(path.join(__dirname + "images")));

    this.app.set('view engine', 'ejs');
  }

  private corsConfig(): void {
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      next();
      this.app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
      });
    });
  }

  private connectionConfig(): void {
    createConnection({
      connectTimeout  : 60 * 60 * 1000,
      acquireTimeout: 60 * 60 * 1000,
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [
        UserEntity,
        AccountEntity,
        OperationEntity,
      ],
      synchronize: true,
      logging: false,
    }).then(connection => {
      console.log('Connected');
    }).catch(error => console.log(error));
  }
}

export default new App().app;
