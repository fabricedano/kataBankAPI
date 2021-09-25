import { Account } from '../account/account.i';

export class CreateOperationDto {
    type: string;
    amount: number;
    date: Date;
    account: Account;
}
