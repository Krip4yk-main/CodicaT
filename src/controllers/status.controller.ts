import * as express from 'express';
import {BAD_REQUEST, ERROR, OK} from "../utils/responces";
import {Status} from "../models";
import {CrudController} from "./crud.controller";

class StatusController extends CrudController {
    constructor() {
        super("/status");
    }
}

export default StatusController;