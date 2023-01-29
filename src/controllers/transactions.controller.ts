import * as express from 'express';
import {BAD_REQUEST, ERROR, OK} from "../utils/responces";
import {Bank, Category, Status, Transactions} from "../models";
import {CrudController} from "./crud.controller";


class TransactionsController extends CrudController {
    public path = '/transactions';

    constructor() {
        super(Transactions);
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAll);
        this.router.get(this.path + '/id', this.getOne); //for some reasons /:id do
        this.router.post(this.path + "/update", this.update);
        this.router.post(this.path, this.create);
        this.router.delete(this.path, this.delete);
    }

    create = async (request: express.Request, response: express.Response) => {
        let data: any
        try {
            data = JSON.parse(JSON.stringify(request.body)).data;
            if (!data || !data.bankId || !data.amount || !data.categories || !data.status) {
                BAD_REQUEST(response, {message: "Missing arguments or bad JSON, read docs!"})
                return;
            }
            const temp_bank = await Bank.findOne({
                where: {
                    id: data.bankId
                }
            })
            if (!temp_bank) {
                BAD_REQUEST(response, {message: "Missing Bank {" + data.bankId + "}"})
                return;
            }
            for (let category of data.categories) {
                const temp_category = await Category.findOne({
                    where: {
                        name: category
                    }
                })
                if (!temp_category) {
                    BAD_REQUEST(response, {message: "Missing Category {" + category + "}"})
                    return;
                }
            }
            const temp_status = await Status.findOne({
                where: {
                    name: data.status
                }
            })
            if (!temp_status) {
                BAD_REQUEST(response, {message: "Missing status {" + data.status + "}"})
                return;
            }
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
        const parsed_categories = this.jsonArray_to_stringArray(data.categories)
        Transactions.create({
            bankId: data.bankId,
            amount: data.amount,
            categories: parsed_categories,
            status: data.status
        }).then((res: any) => {
            Bank.findOne({
                where: {
                    id: res.bankId
                }
            }).then((bank: any) => {
                Bank.update({
                    balance: (bank.balance + res.amount)
                }, {
                    where: {
                        id: res.bankId
                    }
                }).then(() => {
                    OK(response, res)
                }).catch((error: any) => {
                    Transactions.destroy({
                        where: {
                            id: res.id
                        }
                    }).catch(error => {
                        console.error(error)
                        ERROR(response, {message: "Cannot return state to previous. Please contact administrator!"})
                    })
                    console.error(error)
                    ERROR(response, {message: error})
                })
            }).catch((error: any) => {
                Transactions.destroy({
                    where: {
                        id: res.id
                    }
                }).catch(error => {
                    console.error(error)
                    ERROR(response, {message: "Cannot return state to previous. Please contact administrator!"})
                })
                console.error(error)
                ERROR(response, {message: error})
            })
        }).catch((error: any) => {
            console.error(error)
            ERROR(response, {message: error})
        })
    }

    update = (request: express.Request, response: express.Response) => {
        let data: any
        try {
            data = JSON.parse(JSON.stringify(request.body)).data;
            if (!data || !data.id || (!data.bankId && !data.amount && !data.categories && !data.status)) {
                BAD_REQUEST(response, {message: "Missing arguments or bad JSON, read docs!"})
                return;
            }
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
        let parsed_categories: string;
        if (data.categories) {
            parsed_categories = this.jsonArray_to_stringArray(data.categories)
        }
        Transactions.findOne({
            where: {
                id: data.id
            }
        }).then((transaction: any) => {
            Transactions.update({
                bankId: data.bankId || transaction.bankId,
                amount: data.amount || transaction.amount,
                categories: parsed_categories || transaction.categories,
                status: data.status || transaction.status
            }, {
                where: {
                    id: data.id
                }
            }).then((res: any) => {
                if (data.amount) {
                    Bank.findOne({
                        where: {
                            id: transaction.bankId
                        }
                    }).then((bank: any) => {
                        Bank.update({
                            balance: (bank.balance + data.amount) // I don't know should I make check if
                        }, {
                            where: {
                                id: transaction.bankId
                            }
                        }).then(() => {
                            OK(response, {affected: res})
                        }).catch((error: any) => {
                            Transactions.update({
                                bankId: transaction.bankId,
                                amount: transaction.amount,
                                categories: transaction.categories,
                                status: transaction.status
                            }, {
                                where: {
                                    id: transaction.id
                                }
                            }).catch(error => {
                                console.error(error)
                                ERROR(response, {message: "Cannot return state to previous. Please contact administrator!"})
                            })
                            console.error(error)
                            ERROR(response, {message: error})
                        })
                    }).catch((error: any) => {
                        Transactions.update({
                            bankId: transaction.bankId,
                            amount: transaction.amount,
                            categories: transaction.categories,
                            status: transaction.status
                        }, {
                            where: {
                                id: transaction.id
                            }
                        }).catch(error => {
                            console.error(error)
                            ERROR(response, {message: "Cannot return state to previous. Please contact administrator!"})
                        })
                        console.error(error)
                        ERROR(response, {message: error})
                    })
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

    private jsonArray_to_stringArray(array: any): string {
        let parsed_categories = "{";
        array.forEach((x: any) => {
            parsed_categories += ("" + x + ",");
        })
        parsed_categories = parsed_categories.substring(0, parsed_categories.length - 1) + "}";
        return parsed_categories
    }
}

export default TransactionsController;