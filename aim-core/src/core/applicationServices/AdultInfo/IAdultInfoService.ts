import { AdultInfo } from 'src/core/domains/AdultInfo/AdultInfo';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';
export interface IAdultInfoService extends IGeneralDtoService {
    fetchAllAdultInfosWithCriteria(criteria): Promise<unknown>;
    fetchAdultInfoById(id: number): Promise<unknown>;
    saveAdultInfo(data: AdultInfo);
}
