import {DataTypes} from 'sequelize';
import {sequelize} from './sequelizeInst';
import user, {UserInstance} from './user.model';

import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
export class RoleInstance extends Model {
    @Column(DataTypes.TEXT)
    name!: string
  
    @HasMany(() => user)
    users!: UserInstance[]
}



const role = sequelize.define<RoleInstance>(
    'roles',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    }
);

export default role;
