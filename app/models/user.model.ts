import {DataTypes} from 'sequelize';
import {RoleInstance} from './role.model';
import {RefreshTokenInstance} from './refreshToken.model';
import {sequelize} from './sequelizeInst';

import { Table, Column, Model, ForeignKey, BelongsTo, HasOne, HasMany } from 'sequelize-typescript';


@Table
export class UserInstance extends Model {
  
    @Column(DataTypes.TEXT)
    password!: string;
    @Column(DataTypes.TEXT)
    email!: string;

    @ForeignKey(() => RoleInstance)
    @HasMany(() => RoleInstance)
    role!: RoleInstance[];
    getRoles!: () => Promise<RoleInstance[]>;
    setRoles!: (role: RoleInstance[] | number[]) => Promise<undefined>;
    /*
    @ForeignKey(() => RefreshTokenInstance)
    @HasOne(() => RefreshTokenInstance)
    refreshToken!: RefreshTokenInstance;
    getRefreshToken!: () => Promise<RefreshTokenInstance>;
    setRefreshToken!: (refreshToken: RefreshTokenInstance | number) => Promise<undefined>;
    */
}

const user = sequelize.define<UserInstance>(
    'users',
    {
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
    }
});

export default user;