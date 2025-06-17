import { GlobalProject } from 'src/core/domains/GlobalProject/GlobalProject';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { OrderbyPropreties } from 'src/core/domains/OrderbyProperties/OrderbyProperties';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IProjectService extends IGeneralDtoService {
    createProject(gProject: GlobalProject);
    fetchAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
        orders?: OrderbyPropreties[],
    ): Promise<Record<string, any>>;
    validateProject(id: number);
    invalidateProject(id: number);
    fetchProjectNotValidated(criteria: any): Promise<Record<string, any>>;
}
