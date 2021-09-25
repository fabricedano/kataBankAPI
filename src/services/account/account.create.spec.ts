import { AccountService } from './account';
import { createAccountDto, accountMock } from '../../test-files';

describe('Create account', () => {

    let accountService: AccountService;
    beforeEach(() => {
        accountService = new AccountService();
    });

    it('Should return true when name of account is not empty', async () => {
        // Arrange
        const accountName = 'Compte A';
        // Act
        const output = await accountService.ifHaveName(accountName);
        // Assert
        expect(output).toEqual(true);
    });

    it('Should create user account when having a valid account', async () => {
        const myAccount = createAccountDto;
        spyOn(accountService, 'createAccount').and.returnValue(Promise.resolve(accountMock));
        const output: any = await accountService.createAccount(myAccount);
        expect(output.id).toBeDefined();
    });
});
