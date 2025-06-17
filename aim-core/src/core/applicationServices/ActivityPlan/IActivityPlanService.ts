import { GlobalActivityPlan } from 'src/core/domains/GlobalActivityPlan/GlobalActivityPlan';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';
export interface IActivityPlanService extends IGeneralDtoService {
    createActivityPlan(data: GlobalActivityPlan);
}
