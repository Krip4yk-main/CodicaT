import * as express from 'express';
import {BAD_REQUEST, ERROR, OK} from "../utils/responces";
import {Bank} from "../models";

class BankController {
    public path = '/bank';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAll);
        this.router.get(this.path+'/id', this.getOne); //for some reasons /:id do
        this.router.post(this.path+"/update", this.update);
        this.router.post(this.path, this.create);
        this.router.delete(this.path, this.delete);
    }

    getAll = (request: express.Request, response: express.Response) => {
        Bank.findAll().then(res => {
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
        Bank.findOne({
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
        Bank.update({
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
        Bank.destroy({
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

export default BankController;