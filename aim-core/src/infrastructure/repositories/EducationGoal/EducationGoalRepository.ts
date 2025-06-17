import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationGoal } from 'src/core/domains/EducationGoal/EducationGoal';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { IEducationGoalRepository } from 'src/core/domainServices/EducationGoal/IEducationGoalRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class EducationGoalRepository
    extends GeneralDtoRepository
    implements IEducationGoalRepository
{
    constructor(
        @InjectRepository(EducationGoal)
        private educationGoalRepository: Repository<EducationGoal>,
    ) {
        super(educationGoalRepository);
    }

    joinProperties: JoinProperties[] = [
        {
            property: 'EducationGoal.educationField',
            alias: 'educationField',
        },
        { property: 'EducationGoal.sectionStep', alias: 'sectionStep' },
    ];

    async findAllEducationGoalsWithCriteria(criteria): Promise<unknown> {
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
        let query = this.educationGoalRepository.createQueryBuilder();
        query = this.appendProperties(query, this.joinProperties);
        if (criteria.education_goal) {
            const edcg = `%${criteria.education_goal}%`;
            delete criteria.education_goal;
            query = query
                .where('education_goal like :edcg', {
                    edcg,
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
    async findEducationGoalById(id: number): Promise<unknown> {
        return {
            user: await this.findById(id, this.joinProperties),
        };
    }
}
