import {verifyToken, isAdmin, isModerator} from './authJwt';
import {checkDuplicateUserOrEmail, checkRolesExisted} from './verifySignUp';

export default {
    verifyToken,
    isAdmin,
    isModerator,
    checkDuplicateUserOrEmail,
    checkRolesExisted
}
