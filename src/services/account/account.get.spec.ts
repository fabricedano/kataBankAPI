import { AccountService } from './account';
import { allAccountMock } from '../../test-files';

describe('Get account', () => {

    let accountService: AccountService;
    beforeEach(() => {
        accountService = new AccountService();
    });

    it('Should return all account when calling methode get all account ', async () => {
        // Arrange
        spyOn(accountService, 'getAllAccount').and.returnValue(Promise.resolve(allAccountMock));

        // Act
        const output: any = await accountService.getAllAccount();

        // Assert
        expect(output).toBeInstanceOf(Array);
    });
});
