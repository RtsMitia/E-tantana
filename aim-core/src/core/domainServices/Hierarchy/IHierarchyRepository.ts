import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IHierarchyRepository extends IGeneralDtoRepository {
    findAllHierarchies();
    getHierarchies();
}
