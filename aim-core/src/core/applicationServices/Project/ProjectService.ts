import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { GlobalProject } from 'src/core/domains/GlobalProject/GlobalProject';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { OrderbyPropreties } from 'src/core/domains/OrderbyProperties/OrderbyProperties';
import { IProjectRepository } from 'src/core/domainServices/Project/IProjectRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IProjectService } from './IProjectService';

@Injectable()
export class ProjectService
    extends GeneralDtoService
    implements IProjectService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PROJECT_REPOSITORY)
        private readonly projectRepository: IProjectRepository,
    ) {
        super(projectRepository);
    }

    createProject(gProject: GlobalProject) {
        return this.projectRepository.createProject(gProject);
    }

    fetchAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
        orders?: OrderbyPropreties[],
    ): Promise<Record<string, any>> {
        return this.projectRepository.findAllWithCriteria(
            criteria,
            properties,
            orders,
        );
    }

    validateProject(id: number) {
        return this.projectRepository.validateProject(id);
    }

    invalidateProject(id: number) {
        return this.projectRepository.invalidateProject(id);
    }

    fetchProjectNotValidated(criteria: any): Promise<Record<string, any>> {
        return this.projectRepository.getProjectNotValidated(criteria);
    }
}
