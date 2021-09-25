import { CreateAccountDto } from '../../model/account/account';
import { Account } from '../../model/account/account.i';
import { AccountEntity } from '../../entity/account/account';
import { UserEntity } from '../../entity/user/user';

export const createAccountDto = new CreateAccountDto();
createAccountDto.name = 'Compte A';

export const account: AccountEntity = {
    id: 1,
    hasId: () => true,
    save: () => Promise.resolve(new AccountEntity()),
    remove: () => Promise.resolve(new AccountEntity()),
    reload: () => Promise.resolve(),
    name: 'Compte A',
    solde: 400,
    user: new UserEntity(),
};

export const accountMock: Account = {
    id: 1,
    name: 'Compte A',
    solde: 400,
    user: {
        id: 1,
        name: 'toto',
        email: 'dadie.emilin@gmail.com',
        address: '14 rue de Mulhouse',
        accounts: [],
    },
};

export const allAccountMock: Account[] = [
    {
        id: 1,
        name: 'Compte A',
        solde: 400,
        user: {
            id: 1,
            name: 'toto',
            email: 'dadie.emilin@gmail.com',
            address: '14 rue de Mulhouse',
            accounts: [],

        },
    },
];
