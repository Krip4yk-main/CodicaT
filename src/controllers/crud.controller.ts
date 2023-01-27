import * as express from "express";
import {Status} from "../models";
import {BAD_REQUEST, ERROR, OK} from "../utils/responces";

export class CrudController {
    public router = express.Router();

    constructor(path: string) {
        this.initializeRoutes(path);
    }

    public initializeRoutes(path: string) {
        this.router.get(path, this.getAll);
        this.router.get(path+'/id', this.getOne); //for some reasons /:id do
        this.router.post(path+"/update", this.update);
        this.router.post(path, this.create);
        this.router.delete(path, this.delete);
    }

    getAll = (request: express.Request, response: express.Response) => {
        Status.findAll().then(res => {
            OK(response, res)
        }).catch(error => {
            console.error(error)
            ERROR(response, {message: error})
        });
    }

    getOne = (request: express.Request, response: express.Response) => {
        let data: any
        try {
            data = JSON.parse(JSON.stringify(request.query));
            if (!data.id) {
                BAD_REQUEST(response, {message: "Missing arguments, read docs!"})
                return;
            }
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
        Status.findOne({
            where: {
                id: data.id
            }
        }).then(res => {
            OK(response, res)
        }).catch(error => {
            console.error(error)
            ERROR(response, {message: error})
        });
    }

    create = (request: express.Request, response: express.Response) => {
        let data: any
        try {
            data = JSON.parse(JSON.stringify(request.body)).data;
            if (!data.name || !data.balance) {
                BAD_REQUEST(response, {message: "Missing arguments, read docs!"})
                return;
            }
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
        Status.create({
            name: data.name
        }).then(res => {
            OK(response, res)
        }).catch(error => {
            console.error(error)
            ERROR(response, {message: error})
        })
    }

    update = (request: express.Request, response: express.Response) => {
        let data: any
        try {
            data = JSON.parse(JSON.stringify(request.body)).data;
            if (!data.id || !data.name) {
                BAD_REQUEST(response, {message: "Missing arguments, read docs!"})
                return;
            }
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
        Status.update({
            name: data.name
        }, {
            where: {
                id: data.id
            }
        }).then(res => {
            OK(response, {affected: res})
        }).catch(error => {
            console.error(error)
            ERROR(response, {message: error})
        })
    }

    delete = (request: express.Request, response: express.Response) => {
        let data: any
        try {
            data = JSON.parse(JSON.stringify(request.body)).data;
            if (!data.id) {
                BAD_REQUEST(response, {message: "Missing arguments, read docs!"})
                return;
            }
        } catch (error) {
            console.error(error)
            BAD_REQUEST(response, {message: error})
            return;
        }
        Status.destroy({
            where: {
                id: data.id
            }
        }).then(res => {
            OK(response, {affected: res})
        }).catch(error => {
            console.error(error)
            ERROR(response, {message: error})
        })
    }
}