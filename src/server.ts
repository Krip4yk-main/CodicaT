import App from './app';
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