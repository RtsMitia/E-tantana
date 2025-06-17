import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectResult } from 'src/core/domains/ProjectResult/ProjectResult';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ProjectResultRepository extends GeneralDtoRepository {
    constructor(
        @InjectRepository(ProjectResult)
        projectResultRepository: Repository<ProjectResult>,
    ) {
        super(projectResultRepository);
    }
}
