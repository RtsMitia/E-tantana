import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ProjectUser } from 'src/core/domains/ProjectUser/ProjectUser';
import { IProjectUserRepository } from 'src/core/domainServices/ProjectUser/IProjectUserRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IProjectUserService } from './IProjectUserService';

@Injectable()
export class ProjectUserService
    extends GeneralDtoService
    implements IProjectUserService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PROJECTUSER_REPOSITORY)
        private readonly projectUserRepository: IProjectUserRepository,
    ) {
        super(projectUserRepository);
    }

    fetchByUsername(mail: string, phone_number: string): Promise<ProjectUser> {
        return this.projectUserRepository.findByUsername(mail, phone_number);
    }

    fetchAllUsersWithCriteria(criteria): Promise<unknown> {
        return this.projectUserRepository.findAllUsersWithCriteria(criteria);
    }

    fetchUserById(id: number): Promise<unknown> {
        return this.projectUserRepository.findUserById(id);
    }

    createUser(user: ProjectUser): Promise<unknown> {
        return this.projectUserRepository.createUser(user);
    }

    login(user: { username: string; password: string }): Promise<unknown> {
        return this.projectUserRepository.login(user);
    }
}
