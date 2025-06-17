import { GlobalActivityPlan } from 'src/core/domains/GlobalActivityPlan/GlobalActivityPlan';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IActivityPlanRepository extends IGeneralDtoRepository {
    createActivityPlan(data: GlobalActivityPlan);
}
