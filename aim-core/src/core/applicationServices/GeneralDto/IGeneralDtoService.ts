import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { OrderbyPropreties } from 'src/core/domains/OrderbyProperties/OrderbyProperties';

export interface IGeneralDtoService {
    save(data: unknown): Promise<unknown>;
    count(criteria): Promise<unknown>;
    fetchAll(relations?: any): Promise<unknown[]>;
    fetchAllWithPaging(
        offset: number,
        limit: number,
        properties?: JoinProperties[],
    ): Promise<unknown[]>;
    fetchAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
        orders?: OrderbyPropreties[],
    ): Promise<Record<string, any>>;
    fetchById(id: number, properties?: JoinProperties[]): Promise<unknown>;
    update(id: number, data: unknown): Promise<unknown>;
    fetchIdWithCriteria(criteria: any);
    delete(id: number);
}
