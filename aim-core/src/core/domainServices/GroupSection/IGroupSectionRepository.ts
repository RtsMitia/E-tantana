import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IGroupSectionRepository extends IGeneralDtoRepository {
    findAllGroupSectionsWithCriteria(criteria): Promise<unknown>;
    findGroupSectionById(id: number): Promise<unknown>;
}
