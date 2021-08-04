import * as e from 'express';
import middleware from '../middleware';
import {signup, signin, createNewToken} from '../controllers/auth.controller';

export default (app: e.Application) => {
    app.use(function(req, res, next) {
        res.header(
            'Acces-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post(
        '/api/auth/signup',
        [
            middleware.checkDuplicateUserOrEmail,
            middleware.checkRolesExisted,
        ],
        signup
    );

    app.post('/api/auth/signin', signin);

    app.post('/api/auth/refreshToken', createNewToken);
}
