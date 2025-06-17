import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { ProjectTarget } from 'src/core/domains/ProjectTarget/ProjectTarget';
import { SelectQueryBuilder } from 'typeorm';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IProjectTargetRepository extends IGeneralDtoRepository {
    appendProperties(
        query: SelectQueryBuilder<ProjectTarget>,
        properties: JoinProperties[],
    );
    findAllWithCriteria(criteria: ProjectTarget, properties?: JoinProperties[]);
}
