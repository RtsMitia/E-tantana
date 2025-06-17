import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailActivityPlanTalentGoal } from 'src/core/domains/DetailActivityPlanTalentGoal/DetailActivityPlanTalentGoal';
import { IDetailActivityPlanTalentGoalRepository } from 'src/core/domainServices/DetailActivityPlanTalentGoal/IDetailActivityPlanTalentGoalRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class DetailActivityPlanTalentGoalRepository
    extends GeneralDtoRepository
    implements IDetailActivityPlanTalentGoalRepository
{
    constructor(
        @InjectRepository(DetailActivityPlanTalentGoal)
        detailActivityPlanTalentGoalRepository: Repository<DetailActivityPlanTalentGoal>,
    ) {
        super(detailActivityPlanTalentGoalRepository);
    }

    async createDetailActivityPlanTalentGoal(data) {
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
