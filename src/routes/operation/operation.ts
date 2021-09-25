import { OperationController } from '../../controllers/operation/operation';
import { protectedRoute } from '../../common/authentification';

export class OperationRoute {
    public operationController: OperationController = new OperationController();
    public routes(app): void {
        app.route('/operations').post(protectedRoute(), this.operationController.createOperation);
        app.route('/operations/last').get(protectedRoute(), this.operationController.getLastOperationByAccountId);
        app.route('/operations/:id').get(protectedRoute(), this.operationController.getOperationById);
        app.route('/operations').get(protectedRoute(), this.operationController.getOperationsByAccountId);
    }
}
