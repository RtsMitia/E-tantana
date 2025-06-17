import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { ProjectTarget } from 'src/core/domains/ProjectTarget/ProjectTarget';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IProjectTargetService extends IGeneralDtoService {
    fetchAllWithCriteria(
        criteria: ProjectTarget,
        properties?: JoinProperties[],
    );
}
