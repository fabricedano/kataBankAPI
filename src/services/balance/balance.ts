import { OperationService } from '../operation/operation';
import { Operation } from '../../model/operation/operation.i';

export class BalanceService {

    operationService: OperationService;
    constructor(operationService: OperationService) {
        this.operationService = operationService;
    }

    async getBalanceByAccountId(accountId: number, startDate?: Date, endDate?: Date, localDate?: Date): Promise<number> {
        const operations: Operation[] = await this.operationService.getOperationByAccountId(accountId, startDate, endDate, localDate);
        if (operations.length === 1) {
            return operations[0].amount;
        }
        if (operations.length >= 2) {
            const balance = (operations.map(operation => operation.amount).reduce((a, b) => a + b));
            return balance;
        }
        return 0;
    }
}
