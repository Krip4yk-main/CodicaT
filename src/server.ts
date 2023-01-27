import App from './app';
import BankController from "./controllers/bank.controller";

const port = Number(process.env.PORT)

const app = new App(
    [
        new BankController(),
    ],
    port,
);

app.listen();