import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailActivityPlan } from 'src/core/domains/DetailActivityPlan/DetailActivityPlan';
import { IDetailActivityPlanRepository } from 'src/core/domainServices/DetailActivityPlan/IDetailActivityPlanRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class DetailActivityPlanRepository
    extends GeneralDtoRepository
    implements IDetailActivityPlanRepository
{
    constructor(
        @InjectRepository(DetailActivityPlan)
        private detailActivityPlanRepository: Repository<DetailActivityPlan>,
    ) {
        super(detailActivityPlanRepository);
    }

    async createDetailActivityPlan(data) {
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
