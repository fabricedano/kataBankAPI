import { Account } from '../account/account.i';

export interface Operation {
    id: number;
    type: string;
    amount: number;
    date: Date;
    account: Account;
}
