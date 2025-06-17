import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IGroupSectionService extends IGeneralDtoService {
    fetchAllGroupSectionsWithCriteria(criteria): Promise<unknown>;
    fetchGroupSectionById(id: number): Promise<unknown>;
}
