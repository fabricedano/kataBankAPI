import { IndexController } from '../../controllers/index';

export class IndexRoute {
    public indexController: IndexController = new IndexController();
    public routes(app): void {
        app.route('/').get(this.indexController.index);
    }
}
