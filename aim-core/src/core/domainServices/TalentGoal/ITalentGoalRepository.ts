import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface ITalentGoalRepository extends IGeneralDtoRepository {
    findAllWithCriteria(
        criteria,
        joinProperties: JoinProperties[],
    ): Promise<unknown>;
}
