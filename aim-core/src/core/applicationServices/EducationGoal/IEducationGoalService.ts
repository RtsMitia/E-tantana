import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IEducationGoalService extends IGeneralDtoService {
    fetchAllEducationGoalsWithCriteria(criteria): Promise<unknown>;
    fetchEducationGoalById(id: number): Promise<unknown>;
}
