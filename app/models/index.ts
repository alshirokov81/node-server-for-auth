import user from './user.model';
import role, {RoleInstance} from './role.model';
import refreshToken from './refreshToken.model';

user.belongsToMany(role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId',
});

role.belongsToMany(user, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
});

refreshToken.belongsTo(user, {
    foreignKey: 'userId',
    targetKey: 'id'
});

user.hasOne(refreshToken, {
    foreignKey: 'userId',
    //targetKey: 'id',
});

export {user, role, refreshToken, RoleInstance}
