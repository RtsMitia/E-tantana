import { ProjectUser } from 'src/core/domains/ProjectUser/ProjectUser';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IProjectUserService extends IGeneralDtoService {
    fetchByUsername(mail: string, phone_number: string): Promise<ProjectUser>;
    fetchAllUsersWithCriteria(criteria): Promise<unknown>;
    fetchUserById(id: number): Promise<unknown>;
    createUser(user: ProjectUser): Promise<unknown>;
    login(user: { username: string; password: string }): Promise<unknown>;
}
