import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralDto } from 'src/core/domains/GeneralDto/GeneralDto';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { OrderbyPropreties } from 'src/core/domains/OrderbyProperties/OrderbyProperties';
import { IGeneralDtoRepository } from 'src/core/domainServices/GeneralDto/IGeneralDtoRepository';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class GeneralDtoRepository implements IGeneralDtoRepository {
    constructor(
        @InjectRepository(GeneralDto)
        private repository: Repository<GeneralDto>,
    ) {}

    save(data: unknown): Promise<unknown> {
        return this.repository.save(data);
    }

    count(criteria): Promise<unknown> {
        return this.repository.countBy(criteria);
    }

    findAll(relations?: any): Promise<unknown[]> {
        if (relations) return this.repository.find({ relations });
        else return this.repository.find();
    }

    findAllWithPaging(
        offset: number,
        limit: number,
        properties?: JoinProperties[],
    ): Promise<unknown[]> {
        let query = this.repository.createQueryBuilder();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        if (properties) query = this.appendProperties(query, properties);
        return this.repository
            .createQueryBuilder()
            .offset(offset)
            .limit(limit)
            .getMany();
    }

    async findAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
        orders?: OrderbyPropreties[],
    ): Promise<Record<string, any>> {
        if (criteria.pageNumber < 1 || criteria.page < 1)
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: 'Page and page number values must be greater than 0.',
                },
                HttpStatus.BAD_REQUEST,
            );
        const limit = criteria.pageNumber || 20;
        const page = criteria.page || 1;
        const offset = (page - 1) * limit;
        delete criteria.pageNumber;
        delete criteria.page;
        const number = await this.count(criteria);
        let totalPage = Math.floor(Number(number) / limit);
        if (Number(number) % limit != 0) {
            totalPage = totalPage + 1;
        }
        let query = this.repository.createQueryBuilder();
        if (properties) query = this.appendProperties(query, properties);
        query = query.where(criteria);
        if (orders) query = this.appendOrder(query, orders);
        return {
            data: await query.offset(offset).limit(limit).getMany(),
            pagination: {
                page: +page,
                totalPages: totalPage,
                pageNumber: +limit,
            },
        };
    }

    findById(id: number, properties?: JoinProperties[]): Promise<unknown> {
        let query = this.repository.createQueryBuilder();
        if (properties) query = this.appendProperties(query, properties);
        return query
            .where(`${this.getTableName('.')}id = :id`, { id })
            .withDeleted()
            .getOne();
    }

    update(id: number, data: unknown): Promise<unknown> {
        return this.repository.update(id, data);
    }

    async findIdWithCriteria(criteria: any) {
        const generalDto = this.repository
            .createQueryBuilder()
            .where(criteria)
            .getOne();
        return await generalDto.then((generalDto) => {
            if (generalDto) {
                return generalDto;
            }
            return undefined;
        });
    }

    delete(id: number) {
        return this.repository
            .createQueryBuilder()
            .update()
            .set({ deleted_at: new Date() })
            .where('id = :id', { id: id })
            .execute();
    }

    appendOrder(
        query: SelectQueryBuilder<GeneralDto>,
        orders: OrderbyPropreties[],
    ) {
        orders.forEach((order) => {
            query = query.addOrderBy(order.order, order.option);
        });
        return query;
    }

    appendProperties(
        query: SelectQueryBuilder<any>,
        properties: JoinProperties[],
    ) {
        properties.forEach((prop) => {
            query = query.leftJoinAndSelect(prop.property, prop.alias);
        });
        return query;
    }

    getTableName(args?: string) {
        return this.repository.target.toString().split(' ', 2)[1] + args;
    }
}
