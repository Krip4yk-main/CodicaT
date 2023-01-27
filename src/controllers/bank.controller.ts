import * as express from 'express';
import {OK} from "../utils/responces";
import {Bank} from "../models";

class BankController {
    public path = '/bank';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllBanks);
        this.router.post(this.path, this.createABank);
    }

    getAllBanks = async (request: express.Request, response: express.Response) => {
        const banks = await Bank.findAll();
        OK(response, banks);
    }

    createABank = async (request: express.Request, response: express.Response) => {
        const data = JSON.parse(JSON.stringify(request.body)).data;
        const bank = await Bank.create({
            name: data.name
        })
        OK(response, bank)
    }
}

export default BankController;