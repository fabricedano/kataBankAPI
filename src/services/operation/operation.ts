import { getManager } from 'typeorm';
import { OperationEntity } from '../../entity/operation/operation';
import { AccountService } from '../account/account';
import { CreateOperationDto } from '../../model/operation/operation';
import { operationType } from '../../type/operation';

export class OperationService {

    accountService: AccountService;
    constructor(accountService: AccountService) {
        this.accountService = accountService;
    }
    async createOperation(accountId: number, amount: number) {
        const account = await this.accountService.getAccountById(accountId);
        const updateSolde = await this.accountService.updateSolde(account, amount);
        if (updateSolde) {
            const operation = new CreateOperationDto();
            operation.account = account;
            operation.amount = amount;
            operation.type = amount > 0 ? operationType.deposit : operationType.withdraw;
            operation.date = new Date();
            const createOperation = await getManager().getRepository(OperationEntity).save(operation);
            return createOperation;
        }
    }

    async getOperationById(id: number) {
        return await getManager().getRepository(OperationEntity).findOne({ id });
    }

    async getOperationByAccountId(accountId: number, startDate?: Date, endDate?: Date, localDate?: Date) {
        if (startDate && endDate) {
            const start = new Date(startDate).toISOString();
            const end = new Date(endDate).toISOString();
            return await getManager().getRepository(OperationEntity)
                .createQueryBuilder('operation_entity')
                .where('operation_entity.accountId= :id And operation_entity.date>= :startDate And operation_entity.date<= :endDate',
                { id: accountId, startDate: start, endDate : end }).getMany();
        }
        const myLocalDate = new Date(localDate);

        var firstDay = new Date(myLocalDate.getFullYear(), myLocalDate.getMonth(), 1);
        const lastDay = new Date(myLocalDate.getFullYear(), myLocalDate.getMonth() + 1, 0);

        return await getManager().getRepository(OperationEntity)
            .createQueryBuilder('operation_entity')
            .where('operation_entity.accountId= :id And operation_entity.date>= :startDate And operation_entity.date<= :endDate',
            { id: accountId, startDate: firstDay.toISOString(), endDate : lastDay.toISOString() }).getMany();
    }

    async getLastOperationByAccountId(accountId: number){
        const res =  await getManager().getRepository(OperationEntity)
        .createQueryBuilder('operation_entity')
        .orderBy({date : 'DESC'})
        .where('operation_entity.accountId= :id',
        { id: accountId}).getMany();
        return res[0];
    }
}
