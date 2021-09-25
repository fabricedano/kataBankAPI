import { RequestHandler } from 'express';
import * as passport from 'passport';

export function protectedRoute (){
    const jwtAuth: RequestHandler = passport.authenticate('jwt', {
        session: false,
    });
    return jwtAuth;
};
