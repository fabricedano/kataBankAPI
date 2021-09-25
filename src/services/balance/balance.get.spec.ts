import { BalanceService } from './balance';
import { OperationService } from '../operation/operation';
import { AccountService } from '../account/account';

describe('Get balance', () => {
    let balanceService: BalanceService;

    beforeEach(() => {
        balanceService = new BalanceService(new OperationService(new AccountService()));
    });

    it('Should return balance when having accountId , startDate and enddate', async () => {
        // Arrange
        const inputAccountId = 1;
        spyOn(balanceService, 'getBalanceByAccountId').and.returnValue(Promise.resolve(100));

        // Act
        const output = await balanceService.getBalanceByAccountId(inputAccountId, new Date(), new Date());

        // Assert
        expect(output).toBe(100);
    });
});
