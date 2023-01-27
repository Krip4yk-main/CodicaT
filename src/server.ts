import App from './app';
import BankController from "./controllers/bank.controller";
import CategoryController from "./controllers/category.controller";
import StatusController from "./controllers/status.controller";
import * as controllers from "./controllers"

const port = Number(process.env.PORT)
const newControllers: Array<any> = new Array<any>();
Object.values(controllers).forEach((X) => {
    newControllers.push(new X())
})

const app = new App(
    newControllers,
    port,
);

app.listen();