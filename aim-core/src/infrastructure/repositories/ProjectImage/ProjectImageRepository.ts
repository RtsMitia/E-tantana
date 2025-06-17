import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectImage } from 'src/core/domains/ProjectImage/ProjectImage';
import { IProjectImageRepository } from 'src/core/domainServices/ProjectImage/IProjectImageRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ProjectImageRepository
    extends GeneralDtoRepository
    implements IProjectImageRepository
{
    constructor(
        @InjectRepository(ProjectImage)
        projectImageRepository: Repository<ProjectImage>,
    ) {
        super(projectImageRepository);
    }
}
