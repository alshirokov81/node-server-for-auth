import type {Dialect} from 'sequelize';

interface pool {
    max: number,
    min: number,
    acquire: number,
    idle: number
}

interface DB {
    HOST: string,
    USER: string,
    PASSWORD: string,
    DB: string,
    dialect: Dialect,
    pool: pool
}

const db: DB = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'testdb',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
}

export default db;
