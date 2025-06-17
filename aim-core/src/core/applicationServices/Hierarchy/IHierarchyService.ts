import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IHierarchyService extends IGeneralDtoService {
    fetchAllHierarchies();
    fetchHierarchies();
}
