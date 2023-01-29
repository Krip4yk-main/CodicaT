import {CrudController} from "./crud.controller";
import {Category, Transactions} from "../models";
import * as express from "express";
import {BAD_REQUEST, ERROR, OK} from "../utils/responces";


class CategoryController extends CrudController {
    public path = '/category';

    constructor() {
        super(Category);
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAll);
        this.router.get(this.path + '/id', this.getOne); //for some reasons /:id do
        this.router.post(this.path + "/update", this.update);
        this.router.post(this.path, this.create);
        this.router.delete(this.path, this.delete);
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
        Category.findOne({
            where: {
                id: data.id
            }
        }).then(category => {
            Transactions.sequelize?.query(`
                select *
                from transactions
                where ${"'" + category?.name + "'"} = any (categories);
            `).then(transactions => {
                if (transactions[0].length === 0) {
                    Category.destroy({
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

export default CategoryController;