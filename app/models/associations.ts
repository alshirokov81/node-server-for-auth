import user from './user.model';
import role from './role.model';
import refreshToken from './refreshToken.model';

export default () => {
    user.hasMany(role, {
        as: 'role',
        foreignKey: 'userId',
    });
    
    role.belongsToMany(user, {
        through: 'user_roles',
        foreignKey: 'roleId',
        otherKey: 'userId'
    });
    
    refreshToken.belongsTo(user, {
        foreignKey: 'refreshTokenId',
        targetKey: 'id'
    });
  /*
    user.hasOne(refreshToken, {
        as: 'refreshToken',
        foreignKey: 'userId',
        //targetKey: 'id',
    });
    */

} 
