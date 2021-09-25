import { AccountService } from './account';
import { account, accountMock } from '../../test-files';

describe('Deposit money', () => {

    let accountService: AccountService;
    beforeEach(() => {
        accountService = new AccountService();
    });

    it('Should save positif money in account', async () => {
        // Arrange
        const inputId = 1;
        const inputMoney = Number(200);
        spyOn(accountService, 'updateSolde').and.returnValue(Promise.resolve(accountMock));

        // Act
        const output: any = await accountService.updateSolde(account, inputMoney);

        // Assert
        expect(output.id).toBeDefined();
    });

    it('Should get money in account (status OK)', async () => {
        // Arrange
        const inputId = 1;
        const inputMoney = Number(200);
        spyOn(accountService, 'updateSolde').and.returnValue(Promise.resolve(accountMock));

        // Act
        const output: any = await accountService.updateSolde(account, inputMoney);

        // Assert
        expect(output.id).toBeDefined();
    });

    it('Should get money in account (Exeption)', async () => {
        // Arrange
        const inputId = 1;
        const inputMoney = Number(-500);
        spyOn(accountService, 'updateSolde').and.returnValue(Promise.resolve(accountMock));

        try {
            // Act
            const output: any = await accountService.updateSolde(account, inputMoney);
        } catch (e) {
            // Assert
            expect(e).toBeInstanceOf(Error);
        }
    });
});
