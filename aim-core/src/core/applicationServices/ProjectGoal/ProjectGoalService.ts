import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IProjectGoalRepository } from 'src/core/domainServices/ProjectGoal/IProjectGoalrepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IProjectGoalService } from './IProjectGoalService';

@Injectable()
export class ProjectGoalService
    extends GeneralDtoService
    implements IProjectGoalService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PROJECTGOAL_REPOSITORY)
        projectGoalRepository: IProjectGoalRepository,
    ) {
        super(projectGoalRepository);
    }
}
