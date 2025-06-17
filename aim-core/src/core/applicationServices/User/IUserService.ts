import { User } from 'src/core/domains/User/User';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';
export interface IUserService extends IGeneralDtoService {
    fetchByUsername(username: string): Promise<User>;
    fetchAllUsersWithCriteria(criteria): Promise<unknown>;
    fetchUserById(id: number): Promise<unknown>;
    createUser(user: User): Promise<unknown>;
    login(user: { username: string; password: string }): Promise<unknown>;
    signToken(user: User): Promise<string>;
    updatePassword(id: number, passwords: any): Promise<unknown>;
    updatePasswordFromForgotten(id: number, password: string): Promise<unknown>;
    forgottenPassword(mail): Promise<unknown>;
    forgottenPasswordLogin(link, code): Promise<unknown>;
    firstPasswordLogin(link): Promise<unknown>;
    updatePasswordFromFirst(id: number, newPassword: string): Promise<unknown>;
    isLinkValidWithCode(link: string): Promise<User>;
}
