import * as e from 'express';

export const allAccess = (req: e.Request, res: e.Response) => {
    res.status(200).send('Public content');
}

export const userBoard = (req: e.Request, res: e.Response) => {
    res.status(200).send('User content');
}

export const adminBoard = (req: e.Request, res: e.Response) => {
    res.status(200).send('Admin content');
}

export const moderatorBoard = (req: e.Request, res: e.Response) => {
    res.status(200).send('Moderator content');
}
