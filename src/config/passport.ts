import * as passport from 'passport';
import {
  Strategy as JWTStrategy, ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { Application } from 'express';
import * as dotenv from 'dotenv';
import { UserEntity } from '../entity/user/user';

export default (app: Application) => {
  dotenv.config();
  app.use(passport.initialize());
  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRET,
  };
  passport.use(
    new JWTStrategy(options, (payload, done) => {
      UserEntity.findOne({ where: { id: payload.id } }).then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      }).catch(err => {
        if (err) {
          return done(err, false);
        }
      });
    }),
  );
};
