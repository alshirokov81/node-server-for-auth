import * as e from 'express';
import jwt from 'jsonwebtoken';
import sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

import {secretData} from '../config/auth.config';
import {user, role, refreshToken, RoleInstance} from '../models';

const Op = sequelize.Op;

export interface requestType extends e.Request{
    body: {
        refreshToken?: string;
    }
}

const createToken = (userId: string) => jwt.sign(
    {id: userId},
    secretData.secret,
    {expiresIn: 300}
);

const createRefreshToken = (userId: string) => jwt.sign(
    {id: userId},
    secretData.secret,
    {expiresIn: 8640000}
);

export const signup = async (req: e.Request, res: e.Response) => {
    const userVal = await user.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    try {
        const reqRoles = JSON.parse(req.body.roles);
        let rolesVal: number[]| RoleInstance[] = [1];
        if (reqRoles) {
            rolesVal = await role.findAll({
                where: {
                    name: {
                        [Op.or]: reqRoles
                    }
                }
            });
        }
        await userVal.setRoles(rolesVal);
        res.send({message: 'User was registered sucessfully'!});
    } catch (err) {
        res.status(500).send({message: err.message});
    };
}

export const signin = async (req: e.Request, res: e.Response) => {
    const userVal = await user.findOne({
        where: {
            username: req.body.username
        }
    });
    if(!userVal) {
        return res.status(404).send({
            message: 'user not found'
        });
    }
    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        userVal.password
    );
    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: 'Invalid Password!'
        })
    }

    const accessToken = createToken(userVal.id);
    const refreshTokenStr = createRefreshToken(userVal.id);
    let authorities: string[] = [];
    try {
        const roles = await userVal.getRoles();
        for (let role of roles) {
            authorities.push('ROLE_' + role.name.toUpperCase())
        }
        const [token] = await refreshToken.findOrCreate({where: {userId: userVal.id}});
        token.token = refreshTokenStr;
        await token.save();
        res.status(200).send({
            id: userVal.id,
            username: userVal.email,
            roles: authorities,
            accessToken: accessToken,
            refreshToken: refreshTokenStr,
        })          
    } catch (err) {
        res.status(500).send({message: err.message});
    };
}

const send401Err = (res: e.Response) => {
    res.status(401).send({
        message: 'Incorrect refresh token!'
    });
}

export const createNewToken = async (req: requestType, res: e.Response) => {
    const refreshTokenVal = req.body.refreshToken;
    if (refreshTokenVal) {
        jwt.verify(refreshTokenVal, secretData.secret, async (err, decoded) => {
            if (!err && !!decoded) {
                const userId = decoded.id;
                const rToken = await refreshToken.findOne({
                    where: {
                        userId: userId,
                        token: refreshTokenVal,
                    }
                });
                if (!!rToken) {
                    try {
                        const token = createToken(userId);
                        const refreshTokenStr = createRefreshToken(userId);
                        rToken.token = refreshTokenStr;
                        await rToken.save();
                        res.status(200).send({
                            id: userId,
                            accessToken: token,
                            refreshToken: refreshTokenStr,
                        })
                    } catch (err) {res.status(500).send({message: err.message})};
                } else {
                    send401Err(res);
                }
            } else {
                send401Err(res);
            }
        });
    } else {
        send401Err(res);
    }
}
