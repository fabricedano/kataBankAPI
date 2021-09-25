import { UserController } from '../../controllers/user/user';
import { protectedRoute } from '../../common/authentification';

export class UserRoute {
    public userController: UserController = new UserController();
    public routes(app): void {
        app.route('/users').post(this.userController.createUser);
        app.route('/users/newtoken').get(this.userController.newToken);
        app.route('/users/login').post(this.userController.logUser);
        app.route('/users/protected').get(protectedRoute(), this.userController.protectedRoute);
    }
}
