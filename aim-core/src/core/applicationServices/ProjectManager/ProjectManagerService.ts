import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IProjectManagerRepository } from 'src/core/domainServices/ProjectManager/IProjectManagerRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IProjectManagerService } from './IProjectManagerService';

@Injectable()
export class ProjectManagerService
    extends GeneralDtoService
    implements IProjectManagerService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PROJECTMANAGER_REPOSITORY)
        projectManagerRepository: IProjectManagerRepository,
    ) {
        super(projectManagerRepository);
    }
}
