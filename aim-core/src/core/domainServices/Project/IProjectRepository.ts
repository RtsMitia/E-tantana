import { GlobalProject } from 'src/core/domains/GlobalProject/GlobalProject';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { OrderbyPropreties } from 'src/core/domains/OrderbyProperties/OrderbyProperties';
import { Project } from 'src/core/domains/Project/Project';
import { SelectQueryBuilder } from 'typeorm';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IProjectRepository extends IGeneralDtoRepository {
    createProject(gProject: GlobalProject);
    findAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
        orders?: OrderbyPropreties[],
    ): Promise<Record<string, any>>;
    appendOrder(
        query: SelectQueryBuilder<Project>,
        orders: OrderbyPropreties[],
    );
    appendProperties(
        query: SelectQueryBuilder<Project>,
        properties: JoinProperties[],
    );
    validateProject(id: number);
    invalidateProject(id: number);
    getProjectNotValidated(criteria: any): Promise<Record<string, any>>;
}
