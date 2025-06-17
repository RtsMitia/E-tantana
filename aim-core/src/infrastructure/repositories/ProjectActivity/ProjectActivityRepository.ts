import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectActivity } from 'src/core/domains/ProjectActivity/ProjectActivity';
import { IProjectActivityRepository } from 'src/core/domainServices/ProjectActivity/IProjectActivityRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ProjectActivityRepository
    extends GeneralDtoRepository
    implements IProjectActivityRepository
{
    constructor(
        @InjectRepository(ProjectActivity)
        projectActivityRepository: Repository<ProjectActivity>,
    ) {
        super(projectActivityRepository);
    }
}
