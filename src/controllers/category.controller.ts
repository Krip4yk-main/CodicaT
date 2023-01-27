import * as express from 'express';
import {OK} from "../utils/responces";
import {Category} from "../models";

class CategoryController {
    public path = '/category';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllCategories);
        this.router.post(this.path, this.createACategory);
    }

    getAllCategories = async (request: express.Request, response: express.Response) => {
        const categories = await Category.findAll();
        OK(response, categories);
    }

    createACategory = async (request: express.Request, response: express.Response) => {
        const data = JSON.parse(JSON.stringify(request.body)).data;
        const category = await Category.create({
            name: data.name,
        })
        OK(response, category)
    }
}

export default CategoryController;