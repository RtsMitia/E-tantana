import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { TalentGoal } from 'src/core/domains/TalentGoal/TalentGoal';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class TalentGoalRepository extends GeneralDtoRepository {
    constructor(
        @InjectRepository(TalentGoal)
        public talentGoalRepository: Repository<TalentGoal>,
    ) {
        super(talentGoalRepository);
    }

    async findAllWithCriteria(
        criteria,
        joinProperties: JoinProperties[],
    ): Promise<unknown> {
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
        let query = this.talentGoalRepository.createQueryBuilder();
        query = this.appendProperties(query, joinProperties);
        if (criteria.talent_goal) {
            const talg = `%${criteria.talent_goal}%`;
            delete criteria.talent_goal;
            query = query
                .where('talent_goal like :talg', {
                    talg,
                })
                .andWhere(criteria);
        } else query = query.where(criteria);
        return {
            data: await query.offset(offset).limit(limit).getMany(),
            pagination: {
                page: +page,
                totalPages: totalPage,
                pageNumber: +limit,
            },
        };
    }
}
