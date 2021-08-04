import * as e from 'express';
import {rolesValues} from '../constands/predefinedData';
import user from '../models/user.model';

export const checkDuplicateUserOrEmail = (req: e.Request, res: e.Response, next: e.NextFunction) => {
    const errors: string[] = [];
    //username
    const checkUsername = user.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            errors.push('Username is already in use!');
            return;
        }
    });
    //email
    const checkEmail = user.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) {
            errors.push('Email is already in use!');
            return;
        }
    });

    Promise.all([checkUsername, checkEmail]).then(
        () => {
            if (errors.length) {
                res.status(400).send({
                    message: `Failed! ${errors.join(' ')}`
                });
            } else {
                next();
            }
        }
    );
}

export const checkRolesExisted = (req: e.Request, res: e.Response, next: e.NextFunction) => {
    const reqRoles = JSON.parse(req.body.roles);
    if(reqRoles){
        for(let role of reqRoles){
            if (!rolesValues[role]) {
                res.status(400).send({
                    message: `Failed! Role does not exist ${role}`
                });
                return;
            }
        }
    }
    next();
}
