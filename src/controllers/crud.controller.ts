import * as express from "express";
import {BAD_REQUEST, ERROR, OK} from "../utils/responces";

export class CrudController {
    public router = express.Router();
    private db_model: any;

    constructor(db_model: any) {
        this.db_model = db_model;
    }

    getAll = (request: express.Request, response: express.Response) => {
        this.db_model.findAll().then((res: any) => {
            OK(response, res)
        }).catch((error: any) => {
            console.error(error)
            ERROR(response, {message: error})
        });
    }

    getOne = (request: express.Request, response: express.Response) => {
        let data: any
        try {
            data = JSON.parse(JSON.stringify(request.query));
            if (!data || !data.id) {
                BAD_REQUEST(response, {message: "Missing arguments or bad JSON, read docs!"})
                return;
            }
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
        this.db_model.findOne({
            where: {
                id: data.id
            }
        }).then((res: any) => {
            OK(response, res)
        }).catch((error: any) => {
            console.error(error)
            ERROR(response, {message: error})
        });
    }

    create = (request: express.Request, response: express.Response) => {
        let data: any
        try {
            data = JSON.parse(JSON.stringify(request.body)).data;
            if (!data || !data.name) {
                BAD_REQUEST(response, {message: "Missing arguments or bad JSON, read docs!"})
                return;
            }
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
        this.db_model.create({
            name: data.name
        }).then((res: any) => {
            OK(response, res)
        }).catch((error: any) => {
            console.error(error)
            ERROR(response, {message: error})
        })
    }

    update = (request: express.Request, response: express.Response) => {
        let data: any
        try {
            data = JSON.parse(JSON.stringify(request.body)).data;
            if (!data || !data.id || !data.name) {
                BAD_REQUEST(response, {message: "Missing arguments or bad JSON, read docs!"})
                return;
            }
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
        this.db_model.update({
            name: data.name
        }, {
            where: {
                id: data.id
            }
        }).then((res: any) => {
            OK(response, {affected: res})
        }).catch((error: any) => {
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
        this.db_model.destroy({
            where: {
                id: data.id
            }
        }).then((res: any) => {
            OK(response, {affected: res})
        }).catch((error: any) => {
            console.error(error)
            ERROR(response, {message: error})
        })
    }
}