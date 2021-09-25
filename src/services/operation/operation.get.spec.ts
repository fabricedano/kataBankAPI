import { operationMock } from '../../test-files/services/operation';
import { OperationService } from './operation';
import { AccountService } from '../account/account';

describe('Get operation', () => {
    let operationService: OperationService;

    beforeEach(() => {
        operationService = new OperationService(new AccountService());
    });

    it('Should return one operation when having operationId', async () => {
        // Arrange
        const inputId = 1;
        const myOperationMock = operationMock;
        spyOn(operationService, 'getOperationById').and.returnValue(Promise.resolve(myOperationMock));

        // Act
        const output: any = await operationService.getOperationById(inputId);

        // Assert
        expect(output.id).toBeDefined();
    });

    it('Should return all operation of one account when having accountId', async () => {
        const inputId = 1;
        const myOperationMock = operationMock;
        spyOn(operationService, 'getOperationByAccountId').and.returnValue(Promise.resolve([myOperationMock]));

        const output: any = await operationService.getOperationByAccountId(inputId);
        expect(output).toBeInstanceOf(Array);
    });
});
