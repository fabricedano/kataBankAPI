import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { OperationService } from '../../services/operation/operation';
import { Operation } from '../../model/operation/operation.i';
import { AccountService } from '../../services/account/account';

export class OperationController {
    public OperationController() {
        dotenv.config();
    }

    public async createOperation(req: Request, res: Response) {
        const operationService = new OperationService(new AccountService());
        const accountId = Number(req.body['accountId']);
        const amount = Number(req.body['amount']);
        try {
            const createOperationResponse = await operationService.createOperation(accountId, amount);
            res.send({
                data: createOperationResponse,
            });
        } catch (e) {
            res.send({ error: { message : e.message }});
        }
    }

    public async getOperationById(req: Request, res: Response) {
        const operationService = new OperationService(new AccountService());
        const operationId = Number(req.params.id);
        try {
            const operationByIdResponse: Operation = await operationService.getOperationById(operationId);
            res.send({
                data: operationByIdResponse,
            });
        } catch (e) {
            res.send({ error: { message : e.message }});
        }
    }

    public async getOperationsByAccountId(req: Request, res: Response) {
        console.log('eioeioeiooeoi 1');
        const operationService = new OperationService(new AccountService);

        const accountId = Number(req.query['accountId']);
        const startDate = req.query['startDate'];
        const endDate =  req.query['endDate'];

        try {
            if (startDate && endDate) {
                if (new Date(startDate) > new Date(endDate)) {
                    res.send({ error: 'Invalid date' });
                } else {
                    const operationByAccountIdResponse: Operation[] = await operationService.getOperationByAccountId(accountId, new Date(startDate), new Date(endDate));
                    res.send({
                        data: operationByAccountIdResponse,
                    });
                }
            } else {
                const localDate = req.query['localDate'];
                const operationByAccountIdResponse: Operation[] = await operationService.getOperationByAccountId(accountId, null, null, new Date(localDate));
                res.send({
                    data: operationByAccountIdResponse,
                });
            }
        } catch (e) {
            res.send({ error: { message : e.message }});
        }
    }

    public async getLastOperationByAccountId(req: Request, res: Response) {
        const operationService = new OperationService(new AccountService);
        const accountId = Number(req.query['accountId']);
        try {
            const lastOperationByAccountIdResponse: Operation = await operationService.getLastOperationByAccountId(accountId);
            res.send({
                data: lastOperationByAccountIdResponse,
            });
        } catch (e) {
            res.send({ error: { message : e.message }});
        }
    }
}
