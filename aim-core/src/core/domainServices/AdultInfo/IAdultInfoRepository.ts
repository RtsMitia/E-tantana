import { AdultInfo } from 'src/core/domains/AdultInfo/AdultInfo';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IAdultInfoRepository extends IGeneralDtoRepository {
    findAllAdultInfosWithCriteria(criteria): Promise<unknown>;
    findAdultInfoById(id: number): Promise<unknown>;
    saveAdultInfo(data: AdultInfo);
}
