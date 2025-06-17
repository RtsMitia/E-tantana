import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IDetailActivityPlanTalentGoalRepository
    extends IGeneralDtoRepository {
    createDetailActivityPlanTalentGoal(data);
}
