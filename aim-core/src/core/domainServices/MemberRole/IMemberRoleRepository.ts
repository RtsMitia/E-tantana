import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IMemberRoleRepository extends IGeneralDtoRepository {
    findAllWithHierarchy(criteria: any): Promise<unknown>;
}