
import configurePassport from './passport';
import * as express from 'express';

export default (app: express.Application) => {
    configurePassport(app);
};
