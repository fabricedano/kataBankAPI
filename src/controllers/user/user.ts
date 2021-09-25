import { UserService } from '../../services/user/user';
import { Request, Response } from 'express';
import * as SignOptions from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { User } from '../../model/user/user.i';

export class UserController {
    public UserController() {
        dotenv.config();
    }
    public async createUser(req: Request, res: Response) {
        const userService = new UserService();
        const user = req.body;
        try {
            const createUserResponse = await userService.createUser(user);
            res.send({ data: createUserResponse });
        } catch (e) {
            res.send({ error: { message : e.message }});
        }
    }

    public async logUser(req: Request, res: Response) {
        const userService = new UserService();
        const email = req.body['email'];
        const password = req.body['password'];
        try {
            const logUserResponse: User = await userService.logUser(email, password);
            const payload = { id: logUserResponse.id };
            const jwtAccessTokenOptions: SignOptions = { expiresIn: process.env.ACCESS_TOKEN_EXPIREIN };
            const jwtRefreshTokenOptions: SignOptions = { expiresIn: process.env.REFRESH_TOKEN_EXPIREIN };

            res.send({
                data: {
                    accessToken: jwt.sign(payload, process.env.JWTSECRET, jwtAccessTokenOptions),
                    refreshToken: jwt.sign(payload, process.env.JWTSECRET, jwtRefreshTokenOptions),
                    user: logUserResponse,
                },
            });
        } catch (e) {
            res.send({ error: { message : e.message }});
        }
    }

    public async newToken(req: Request, res: Response) {
        const refreshToken = req.headers.authorization.split(' ')[1];
        try {
            const verifyRefresh = jwt.verify(refreshToken, process.env.JWTSECRET);
            const payload = { id: verifyRefresh.id };
            const jwtAccessTokenOptions: SignOptions = { expiresIn: process.env.ACCESS_TOKEN_EXPIREIN };
            const jwtRefreshTokenOptions: SignOptions = { expiresIn: process.env.REFRESH_TOKEN_EXPIREIN };

            res.send({
                data: {
                    access_token: jwt.sign(payload, process.env.JWTSECRET, jwtAccessTokenOptions),
                    refresh_token: jwt.sign(payload, process.env.JWTSECRET, jwtRefreshTokenOptions),
                },
            });
        } catch (e) {
            res.send({ error: { message : e.message }});
        }
    }

    public async protectedRoute(req: Request, res: Response) {
        res.send({ data: 'Welcome to the protected route' });
    }
}
