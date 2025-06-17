import { User } from 'src/core/domains/User/User';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';
export interface IUserRepository extends IGeneralDtoRepository {
    findByUsername(username: string): Promise<User>;
    findAllUsersWithCriteria(criteria): Promise<unknown>;
    findUserById(id: number): Promise<unknown>;
    createUser(user: User): Promise<unknown>;
    login(user: { username: string; password: string }): Promise<unknown>;
    signToken(user: User): Promise<string>;
    updatePassword(
        id: number,
        oldPassword: string,
        newPassword: string,
    ): Promise<unknown>;
    updatePasswordFromForgotten(
        id: number,
        newPassword: string,
    ): Promise<unknown>;
    forgottenPassword(mail: string): Promise<unknown>;
    forgottenPasswordLogin(link: string, code: number): Promise<unknown>;
    firstPasswordLogin(link: string): Promise<unknown>;
    updatePasswordFromFirst(id: number, newPassword: string): Promise<unknown>;
    isLinkValidWithCode(link: string): Promise<User>;
}
