import { AccountEntity } from '../../entity/account/account';
import { getManager } from 'typeorm';
import { CreateAccountDto } from '../../model/account/account';
import { Account } from '../../model/account/account.i';

export class AccountService {
    ifHaveName(name: string) {
        if (name && name.length > 0) {
            return true;
        }
        return false;
    }

    async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
        const haveName = await this.ifHaveName(createAccountDto.name);
        if (!haveName) {
            throw new Error('Account should have a name!');
        }
        return await getManager().getRepository(AccountEntity).save(createAccountDto);
    }

    async getAllAccount(): Promise<Account[]> {
        return await getManager().getRepository(AccountEntity).find();
    }

    async updateSolde(account: AccountEntity, amount: number): Promise<Account> {
        account.solde += amount;
        if (account.solde < 0) {
            throw new Error('insufficient balance!');
        }
        return await account.save();
    }

    async getAccountById(id: number): Promise<any> {
        return await getManager().getRepository(AccountEntity).findOne({ id });
    }

    async updateAccount(account: AccountEntity): Promise<Account> {
        return await getManager().getRepository(AccountEntity).save(AccountEntity);
    }

    async getAccountByUserId(userId: number): Promise<Account[]> {
        return await getManager().getRepository(AccountEntity)
            .createQueryBuilder('account_entity')
            .where('account_entity.userId= :id', { id: userId }).getMany();
    }
}
