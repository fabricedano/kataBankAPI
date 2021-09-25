import { AccountService } from '../../services/account/account';
import { Request, Response } from 'express';
import { Account } from '../../model/account/account.i';
import { CreateAccountDto } from '../../model/account/account';

export class AccountController {
    public async creacteAccount(req: Request, res: Response) {
        const accountService = new AccountService();
        let account = new CreateAccountDto();
        try {
            account.name = req.body.name;
            console.log(req.body);
            account.user = JSON.parse(req.body.user);
        } catch (e) {
            account = req.body;
        }

        try {
            const createAccountResponse = await accountService.createAccount(account);
            res.send({ data: createAccountResponse });
        } catch (e) {
            res.send({ error: { message : e.message }});
        }
    }

    public async getAllAccount(req: Request, res: Response) {
        const accountService = new AccountService();
        try {
            const getAllAccountResponse = await accountService.getAllAccount();
            res.send({ data: getAllAccountResponse });
        } catch (e) {
            res.send({ error: { message : e.message }});
        }
    }

    public async getAccountByUserId(req: Request, res: Response) {
        const accountService = new AccountService();
        const userId = Number(req.query['userId']);
        try {
            const userAccountResponse: Account[] = await accountService.getAccountByUserId(userId);
            res.send({
                data: userAccountResponse,
            });
        } catch (e) {
            res.send({ error: { message : e.message }});
        }
    }
}
