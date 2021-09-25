import { User } from '../user/user.i';

export interface Account {
    id: number;
    name: string;
    solde: number;
    user: User;
}
