import * as express from 'express';
import {OK} from "../utils/responces";
import {Status} from "../models";

class StatusController {
    public path = '/status';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllStatuses);
        this.router.post(this.path, this.createAStatus);
    }

    getAllStatuses = async (request: express.Request, response: express.Response) => {
        const statuses = await Status.findAll();
        OK(response, statuses);
    }

    createAStatus = async (request: express.Request, response: express.Response) => {
        const data = JSON.parse(JSON.stringify(request.body)).data;
        const status = await Status.create({
            name: data.name
        })
        OK(response, status)
    }
}

export default StatusController;