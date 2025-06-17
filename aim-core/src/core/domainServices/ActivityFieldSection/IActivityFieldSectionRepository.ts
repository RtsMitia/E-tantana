import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IActivityFieldSectionRepository extends IGeneralDtoRepository {
    findAllActivityFieldSectionsWithCriteria(criteria): Promise<unknown>;
    findActivityFieldSectionById(id: number): Promise<unknown>;
}
