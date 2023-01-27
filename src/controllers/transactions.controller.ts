import * as express from 'express';
import {OK} from "../utils/responces";
import {Transactions} from "../models";

class TransactionsController {
    public path = '/transactions';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllTransactions);
        this.router.post(this.path, this.createATransactions);
    }

    getAllTransactions = async (request: express.Request, response: express.Response) => {
        const transactions = await Transactions.findAll();
        OK(response, transactions);
    }

    createATransactions = async (request: express.Request, response: express.Response) => {
        const data = JSON.parse(JSON.stringify(request.body)).data;
        const transactions = await Transactions.create({
            bankId: data.bankId,
            amount: data.amount,
            category: data.category,
            status: data.status,
        })
        OK(response, transactions)
    }
}

export default TransactionsController;