import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IProjectImageRepository } from 'src/core/domainServices/ProjectImage/IProjectImageRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IProjectImageService } from './IProjectImageService';

@Injectable()
export class ProjectImageService
    extends GeneralDtoService
    implements IProjectImageService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PROJECTIMAGE_REPOSITORY)
        projectImageRepository: IProjectImageRepository,
    ) {
        super(projectImageRepository);
    }
}
