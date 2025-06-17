import { ProjectUser } from 'src/core/domains/ProjectUser/ProjectUser';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IProjectUserRepository extends IGeneralDtoRepository {
    findByUsername(mail: string, phone_number: string): Promise<ProjectUser>;
    findAllUsersWithCriteria(criteria): Promise<unknown>;
    findUserById(id: number): Promise<unknown>;
    createUser(user: ProjectUser): Promise<unknown>;
    login(user: { username: string; password: string }): Promise<unknown>;
    signToken(user: ProjectUser): Promise<string>;
}
