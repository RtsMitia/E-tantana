import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { User } from 'src/core/domains/User/User';
import { IUserRepository } from 'src/core/domainServices/User/IUserRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IUserService } from './IUserService';
@Injectable()
export class UserService extends GeneralDtoService implements IUserService {
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
    ) {
        super(userRepository);
    }

    fetchByUsername(username: string): Promise<User> {
        return this.userRepository.findByUsername(username);
    }

    login(user: { username: string; password: string }): Promise<unknown> {
        return this.userRepository.login(user);
    }

    signToken(user: User): Promise<string> {
        return this.userRepository.signToken(user);
    }

    fetchAllUsersWithCriteria(criteria): Promise<unknown> {
        return this.userRepository.findAllUsersWithCriteria(criteria);
    }

    fetchUserById(id: number): Promise<unknown> {
        return this.userRepository.findUserById(id);
    }

    createUser(user: User): Promise<unknown> {
        return this.userRepository.createUser(user);
    }

    async updatePassword(id: number, passwords: any): Promise<unknown> {
        return await this.userRepository.updatePassword(
            id,
            passwords.old,
            passwords.new,
        );
    }

    async updatePasswordFromForgotten(
        id: number,
        password: string,
    ): Promise<unknown> {
        return await this.userRepository.updatePasswordFromForgotten(
            id,
            password,
        );
    }

    async forgottenPassword(mail): Promise<unknown> {
        return await this.userRepository.forgottenPassword(mail);
    }

    async forgottenPasswordLogin(link, code): Promise<unknown> {
        return await this.userRepository.forgottenPasswordLogin(link, code);
    }

    async firstPasswordLogin(link): Promise<unknown> {
        return await this.userRepository.firstPasswordLogin(link);
    }

    async updatePasswordFromFirst(
        id: number,
        newPassword: string,
    ): Promise<unknown> {
        return await this.userRepository.updatePasswordFromFirst(
            id,
            newPassword,
        );
    }

    async isLinkValidWithCode(link: string): Promise<User> {
        return await this.userRepository.isLinkValidWithCode(link);
    }
}
