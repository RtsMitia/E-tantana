import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IEducationGoalRepository extends IGeneralDtoRepository {
    joinProperties: JoinProperties[];
    findAllEducationGoalsWithCriteria(criteria): Promise<unknown>;
    findEducationGoalById(id: number): Promise<unknown>;
}
