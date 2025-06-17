import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IDetailActivityPlanGoalRepository
    extends IGeneralDtoRepository {
    createDetailActivityPlanGoal(data);
}
