import { GeneralDto } from 'src/core/domains/GeneralDto/GeneralDto';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { OrderbyPropreties } from 'src/core/domains/OrderbyProperties/OrderbyProperties';

import { SelectQueryBuilder } from 'typeorm';

export interface IGeneralDtoRepository {
    save(data: unknown): Promise<unknown>;
    count(criteria): Promise<unknown>;
    findAll(relations?: any): Promise<unknown[]>;
    findAllWithPaging(
        offset: number,
        limit: number,
        properties?: JoinProperties[],
    ): Promise<unknown[]>;
    findAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
        orders?: OrderbyPropreties[],
    ): Promise<Record<string, any>>;
    findById(id: number, properties?: JoinProperties[]): Promise<unknown>;
    update(id: number, data: unknown): Promise<unknown>;
    updateWithCriteria(where: any, data: any): Promise<unknown>;
    findIdWithCriteria(criteria: any);
    delete(id: number);
    appendOrder(
        query: SelectQueryBuilder<GeneralDto>,
        orders: OrderbyPropreties[],
    );
    appendProperties(
        query: SelectQueryBuilder<any>,
        properties: JoinProperties[],
    );
    getTableName(args?: string);
}
