import * as express from 'express';
import {BAD_REQUEST, ERROR, OK} from "../utils/responces";
import {Bank, Transactions} from "../models";
import {CrudController} from "./crud.controller";


class BankController extends CrudController {
    public path = '/bank';

    constructor() {
        super(Bank);
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAll);
        this.router.get(this.path + '/id', this.getOne); //for some reasons /:id do
        this.router.post(this.path + "/update", this.update);
        this.router.post(this.path, this.create);
        this.router.delete(this.path, this.delete);
    }

    create = (request: express.Request, response: express.Response) => {
        let data: any
        try {
            data = JSON.parse(JSON.stringify(request.body)).data;
            if (!data || !data.name || !data.balance) {
                BAD_REQUEST(response, {message: "Missing arguments or bad JSON, read docs!"})
                return;
            }
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
        Bank.create({
            name: data.name,
            balance: data.balance
        }).then(res => {
            OK(response, res)
        }).catch(error => {
            console.error(error)
            ERROR(response, {message: error})
        })
    }

    delete = (request: express.Request, response: express.Response) => {
        let data: any
        try {
            data = JSON.parse(JSON.stringify(request.body)).data;
            if (!data || !data.id) {
                BAD_REQUEST(response, {message: "Missing arguments or bad JSON, read docs!"})
                return;
            }
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
        Bank.findOne({
            where: {
                id: data.id
            }
        }).then(bank => {
            Transactions.findAll({
                where: {
                    bankId: bank?.id
                }
            }).then(transactions => {
                if (transactions.length === 0) {
                    Bank.destroy({
                        where: {
                            id: data.id
                        }
                    }).then((res: any) => {
                        OK(response, {affected: res})
                    }).catch((error: any) => {
                        console.error(error)
                        ERROR(response, {message: error})
                    })
                } else {
                    ERROR(response, {message: "Clear Transactions first"})
                }
            }).catch((error: any) => {
                console.error(error)
                ERROR(response, {message: error})
            })
        }).catch((error: any) => {
            console.error(error)
            ERROR(response, {message: error})
        })
    }
}

export default BankController;