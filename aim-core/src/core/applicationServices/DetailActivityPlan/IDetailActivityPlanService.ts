import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IDetailActivityPlanService extends IGeneralDtoService {
    createDetailActivityPlan(data);
}
