import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IDetailActivityPlanRepository extends IGeneralDtoRepository {
    createDetailActivityPlan(data);
}
