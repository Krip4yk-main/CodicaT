import express, {Application, Request, Response} from "express"
import bodyParser from "body-parser"
import BankController from './controllers/bank.controller';
import {Sequelize} from "sequelize-typescript";
import * as models from "./models";
import {CrudController} from "./controllers/crud.controller";

require("dotenv").config()
class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: CrudController[], port: number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeDatabase();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}))
    }

    private initializeControllers(controllers: CrudController[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeDatabase() {
        const dbHost = process.env.DB_HOST as string;
        const dbPort = Number(process.env.DB_PORT);
        const dbName = process.env.POSTGRES_DB as string;
        const dbUser = process.env.PGADMIN_ADMIN as string;
        const dbPassword = process.env.PGADMIN_PASSWORD as string;

        const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
            host: dbHost,
            port: dbPort,
            models: Object.values(models),
            dialect: 'postgres',
        });

        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;