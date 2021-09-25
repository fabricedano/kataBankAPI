import { Account } from '../account/account.i';

export interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    accounts: Account[];
}
