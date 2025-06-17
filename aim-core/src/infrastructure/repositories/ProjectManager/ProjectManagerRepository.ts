import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectManager } from 'src/core/domains/ProjectManager/ProjectManager';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ProjectManagerRepository extends GeneralDtoRepository {
    constructor(
        @InjectRepository(ProjectManager)
        projectManagerRepository: Repository<ProjectManager>,
    ) {
        super(projectManagerRepository);
    }
}
