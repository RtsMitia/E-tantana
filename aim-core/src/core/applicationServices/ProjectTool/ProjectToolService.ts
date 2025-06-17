import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IProjectToolRepository } from 'src/core/domainServices/ProjectTool/IProjectToolRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IProjectToolService } from './IProjectToolService';

@Injectable()
export class ProjectToolService
    extends GeneralDtoService
    implements IProjectToolService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PROJECTTOOL_REPOSITORY)
        projectToolRepository: IProjectToolRepository,
    ) {
        super(projectToolRepository);
    }
}
