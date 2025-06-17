import { ActivityYear } from 'src/core/domains/ActivityYear/ActivityYear';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IActivityYearRepository extends IGeneralDtoRepository {
    findActivityYear(data: any): Promise<ActivityYear>;
    statisticGlobal(criteria: any);
    paymentStatisticByYear(criteria: any);
}
