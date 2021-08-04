import * as e from 'express';
import middleware from '../middleware';
import {allAccess, userBoard, adminBoard, moderatorBoard} from '../controllers/user.controller';
import { nextTick } from 'process';

export default (app: e.Application) => {
    app.use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.get('/api/test/all', allAccess);

    app.get(
        '/api/test/user',
        [middleware.verifyToken],
        userBoard
    );

    app.get(
        '/api/test/mod',
        [middleware.verifyToken, middleware.isModerator],
        moderatorBoard
    );

    app.get(
        '/api/test/admin',
        [middleware.verifyToken, middleware.isAdmin],
        adminBoard
    )
}
