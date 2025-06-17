import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IProjectResultRepository } from 'src/core/domainServices/ProjectResult/IProjectResultRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IProjectResultService } from './IProjectResultService';

@Injectable()
export class ProjectResultService
    extends GeneralDtoService
    implements IProjectResultService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PROJECTRESULT_REPOSITORY)
        projectResultRepository: IProjectResultRepository,
    ) {
        super(projectResultRepository);
    }
}
