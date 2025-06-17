import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { ProjectTarget } from 'src/core/domains/ProjectTarget/ProjectTarget';
import { IProjectTargetRepository } from 'src/core/domainServices/ProjectTarget/IProjectTargetRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IProjectTargetService } from './IProjectTargetService';

@Injectable()
export class ProjectTargetService
    extends GeneralDtoService
    implements IProjectTargetService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PROJECTTARGET_REPOSITORY)
        private readonly projectTargetRepository: IProjectTargetRepository,
    ) {
        super(projectTargetRepository);
    }

    fetchAllWithCriteria(
        criteria: ProjectTarget,
        properties?: JoinProperties[],
    ) {
        return this.projectTargetRepository.findAllWithCriteria(
            criteria,
            properties,
        );
    }
}
