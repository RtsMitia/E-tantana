import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectGoal } from 'src/core/domains/ProjectGoal/ProjectGoal';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ProjectGoalRepository extends GeneralDtoRepository {
    constructor(
        @InjectRepository(ProjectGoal)
        projectGoalRepository: Repository<ProjectGoal>,
    ) {
        super(projectGoalRepository);
    }
}
