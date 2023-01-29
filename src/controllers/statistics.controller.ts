import {CrudController} from "./crud.controller";
import express from "express";
import {BAD_REQUEST, OK} from "../utils/responces";
import {Category, Transactions} from "../models";


class StatisticsController extends CrudController {
    public path = '/stats';

    constructor() {
        super(null);
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getStats);
    }

    getStats = async (request: express.Request, response: express.Response) => {
        let data: any
        try {
            data = JSON.parse(JSON.stringify(request.body)).data;
            if (!data || !data.categories || !data.fromPeriod || !data.toPeriod) {
                BAD_REQUEST(response, {message: "Missing arguments or bad JSON, read docs!"})
                return;
            }
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
        const res: any = {};
        try {
            for (let x of data.categories) {
                const category = await Category.findOne({
                    where: {
                        id: x
                    }
                })
                if (!category) {
                    console.error("Missed category")
                    // ERROR(response, {message: "Missed category"})
                    continue;
                }
                const transactions = await Transactions.sequelize?.query(`
                    select *
                    from transactions
                    where ${"'" + category.name + "'"} = any (categories)
                      and "createdAt" >= ${"'" + data.fromPeriod + "'"}
                      and "createdAt" <= ${"'" + data.toPeriod + "'"};
                `)
                if (!transactions || transactions[0].length < 1) {
                    res[category.name] = 0;
                    continue;
                }
                let balance = 0;
                transactions[0].forEach((transaction) => {
                    const temp = transaction as Transactions;
                    balance += temp.amount;
                })
                res[category.name] = balance;
            }
            OK(response, res);
            return;
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
    }
}

export default StatisticsController;