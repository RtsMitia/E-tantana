import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface ITalentGoalService extends IGeneralDtoService {
    fetchAllWithCriteria(
        criteria,
        joinProperties: JoinProperties[],
    ): Promise<unknown>;
}
