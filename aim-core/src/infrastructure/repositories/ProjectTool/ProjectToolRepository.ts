import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectTool } from 'src/core/domains/ProjectTool/ProjectTool';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ProjectToolRepository extends GeneralDtoRepository {
    constructor(
        @InjectRepository(ProjectTool)
        projectToolRepository: Repository<ProjectTool>,
    ) {
        super(projectToolRepository);
    }
}
