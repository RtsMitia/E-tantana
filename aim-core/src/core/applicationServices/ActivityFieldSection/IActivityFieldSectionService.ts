import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IActivityFieldSectionService extends IGeneralDtoService {
    fetchAllActivityFieldSectionsWithCriteria(criteria): Promise<unknown>;
    fetchActivityFieldSectionById(id: number): Promise<unknown>;
}
