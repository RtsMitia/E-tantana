import { ActivityYear } from 'src/core/domains/ActivityYear/ActivityYear';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';
export interface IActivityYearService extends IGeneralDtoService {
    fetchActivityYear(data: any): Promise<ActivityYear>;
    statisticGlobal(criteria: any);
    paymentStatisticByYear(criteria: any);
}
