import * as express from "express";

export const OK = (response: express.Response, data: any, status: string = "OK") => {
    response.statusCode = 200;
    response.send({status: status, data: data});
}

export const ERROR = (response: express.Response, data: any, status: string = "ERROR") => {
    response.statusCode = 200;
    response.send({status: status, data: data});
}

export const BAD_REQUEST = (response: express.Response, data: any, status: string = "BAD_REQUEST") => {
    response.statusCode = 400;
    response.send({status: status, data: data});
}