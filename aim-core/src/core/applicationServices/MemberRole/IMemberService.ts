import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IMemberRoleService extends IGeneralDtoService {
    findAllWithHierarchy(criteria: any): Promise<unknown>;
}
