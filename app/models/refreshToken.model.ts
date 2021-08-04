import {DataTypes} from 'sequelize';
import {sequelize} from './sequelizeInst';
import user, {UserInstance} from './user.model';

import { Table, Column, Model, HasOne } from 'sequelize-typescript';

@Table
export class RefreshTokenInstance extends Model {
    @Column(DataTypes.TEXT)
    token!: string

    @HasOne(() => user)
    user!: UserInstance

}



const refreshToken = sequelize.define<RefreshTokenInstance>(
    'refreshTokens',
    {
        token: {
            type: DataTypes.STRING,
            unique: true,
        },
    }
);

export default refreshToken;
