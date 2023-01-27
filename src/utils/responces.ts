import * as express from "express";

export const OK = (response: express.Response, data: any, status: string = "OK") => {
    response.statusCode = 200;
    response.send({status: status, data: data});
}