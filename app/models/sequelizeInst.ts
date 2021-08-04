import config from '../config/db.config';
import {Sequelize, SequelizeScopeError} from 'sequelize';

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        //operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            idle: config.pool.idle
        }
    }
);

export {Sequelize, sequelize}