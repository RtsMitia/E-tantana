import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { OrderbyPropreties } from 'src/core/domains/OrderbyProperties/OrderbyProperties';
import { IGeneralDtoRepository } from 'src/core/domainServices/GeneralDto/IGeneralDtoRepository';
import { IGeneralDtoService } from './IGeneralDtoService';

@Injectable()
export class GeneralDtoService implements IGeneralDtoService {
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.GENERALDTO_REPOSITORY)
        private readonly repository: IGeneralDtoRepository,
    ) {}

    save(data: unknown): Promise<unknown> {
        return this.repository.save(data);
    }

    count(criteria): Promise<unknown> {
        return this.repository.count(criteria);
    }

    fetchAll(relations?: any): Promise<unknown[]> {
        return this.repository.findAll(relations);
    }

    fetchAllWithPaging(
        offset: number,
        limit: number,
        properties?: JoinProperties[],
    ): Promise<unknown[]> {
        return this.repository.findAllWithPaging(offset, limit, properties);
    }

    fetchAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
        orders?: OrderbyPropreties[],
    ): Promise<Record<string, any>> {
        return this.repository.findAllWithCriteria(
            criteria,
            properties,
            orders,
        );
    }

    fetchById(id: number, properties?: JoinProperties[]): Promise<unknown> {
        return this.repository.findById(id, properties);
    }

    update(id: number, data: unknown): Promise<unknown> {
        return this.repository.update(id, data);
    }

    updateWithCriteria(where: any, data: any): Promise<unknown> {
            return this.repository.updateWithCriteria(where, data);
        }
        
    fetchIdWithCriteria(criteria: any) {
        return this.repository.findIdWithCriteria(criteria);
    }

    delete(id: number) {
        return this.repository.delete(id);
    }
}
