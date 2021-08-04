import * as e from 'express';
import jwt from 'jsonwebtoken';
import {secretData} from '../config/auth.config';
import user from '../models/user.model';
import {rolesValues} from '../constands/predefinedData';

export interface requestType extends e.Request{
    userId?: string;
}

export const verifyToken = (req: requestType, res: e.Response, next: e.NextFunction) => {
    let tokenVal = req.headers['x-access-token'] || req.headers['authorization'];
    if (!tokenVal) {
        return res.status(401).send({
            message: 'No token!'
        })
    }
    if (Array.isArray(tokenVal)){
        return res.status(401).send({
            message: 'Token must be a string!'
        });
    } else {
    const BEARER = 'Bearer ';
    let token =  tokenVal.replace(BEARER, '');
    jwt.verify(token, secretData.secret, (err, decoded) => {
        if (err || !decoded) {
            return res.status(401).send({
                message: 'Unathorized!'
            })
        }
        req.userId = decoded.id;
        next();
    });

    }
}

export const isAdmin = (req: requestType, res: e.Response, next: e.NextFunction) => {
    user.findByPk(req.userId).then(user => {
        if (!!user){
            user.getRoles().then(roles => {
                for (let role of roles) {
                    if (role.name === rolesValues.admin){
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: 'Require admin role'
                });
                return;
            })
        }
    })
}

export const isModerator = (req: requestType, res: e.Response, next: e.NextFunction) => {
    user.findByPk(req.userId).then(user => {
        !!user && user.getRoles().then(roles => {
            for (let role of roles) {
                if (role.name === rolesValues.moderator){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: 'Require moderator role'
            });
            return;
        })
    })
}
