import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IMemberGroupNameService extends IGeneralDtoService {
    fetchAllMemberGroupNamesWithCriteria(criteria): Promise<unknown>;
    fetchMemberGroupNameById(id: number): Promise<unknown>;
}
