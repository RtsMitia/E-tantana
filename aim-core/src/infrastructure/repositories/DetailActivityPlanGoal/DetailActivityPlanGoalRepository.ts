import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailActivityPlanGoal } from 'src/core/domains/DetailActivityPlanGoal/DetailActivityPlanGoal';
import { IDetailActivityPlanGoalRepository } from 'src/core/domainServices/DetailActivityPlanGoal/IDetailActivityPlanGoalRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class DetailActivityPlanGoalRepository
    extends GeneralDtoRepository
    implements IDetailActivityPlanGoalRepository
{
    constructor(
        @InjectRepository(DetailActivityPlanGoal)
        private detailActivityPlanGoalRepository: Repository<DetailActivityPlanGoal>,
    ) {
        super(detailActivityPlanGoalRepository);
    }

    async createDetailActivityPlanGoal(data) {
        try {
            return await this.save(data);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: error.sqlMessage,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
