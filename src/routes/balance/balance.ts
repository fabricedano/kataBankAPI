import { BalanceController } from '../../controllers/balance/balance';
import { protectedRoute } from '../../common/authentification';

export class BalanceRoute {
    public balanceController: BalanceController = new BalanceController();
    public routes(app): void {
        app.route('/balances').get(protectedRoute(), this.balanceController.getBalanceByAccountId);
    }
}
