import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { ProjectTarget } from 'src/core/domains/ProjectTarget/ProjectTarget';
import { IProjectTargetRepository } from 'src/core/domainServices/ProjectTarget/IProjectTargetRepository';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class ProjectTargetRepository
    extends GeneralDtoRepository
    implements IProjectTargetRepository
{
    constructor(
        @InjectRepository(ProjectTarget)
        private projectTargetRepository: Repository<ProjectTarget>,
    ) {
        super(projectTargetRepository);
    }

    appendProperties(
        query: SelectQueryBuilder<ProjectTarget>,
        properties: JoinProperties[],
    ) {
        properties.forEach((prop) => {
            query = query.leftJoinAndSelect(prop.property, prop.alias);
        });
        return query;
    }

    async findAllWithCriteria(
        criteria: ProjectTarget,
        properties?: JoinProperties[],
    ) {
        let query = this.projectTargetRepository.createQueryBuilder();
        if (properties) query = this.appendProperties(query, properties);
        if (criteria.id) query = query.where('id = :id', { id: criteria.id });
        if (criteria.other)
            query = query.where('ProjectTarget.other = :other', {
                other: criteria.other,
            });
        return await query.getMany();
    }
}
