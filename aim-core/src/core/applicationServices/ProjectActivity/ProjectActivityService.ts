import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IProjectActivityRepository } from 'src/core/domainServices/ProjectActivity/IProjectActivityRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IProjectActivityService } from './IProjectActivityService';

@Injectable()
export class ProjectActivityService
    extends GeneralDtoService
    implements IProjectActivityService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PROJECTACTIVITY_REPOSITORY)
        projectActivityRepository: IProjectActivityRepository,
    ) {
        super(projectActivityRepository);
    }
}
