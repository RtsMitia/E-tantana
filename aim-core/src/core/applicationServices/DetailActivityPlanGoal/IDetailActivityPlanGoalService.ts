import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IDetailActivityPlanGoalService extends IGeneralDtoService {
    createDetailActivityPlanGoal(data);
}
