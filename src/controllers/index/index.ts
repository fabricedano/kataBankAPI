import { Request, Response } from 'express';

export class IndexController {
    public async index(req: Request, res: Response) {
        res.render('index', { title: 'BankAcountApi' });
    }
}
