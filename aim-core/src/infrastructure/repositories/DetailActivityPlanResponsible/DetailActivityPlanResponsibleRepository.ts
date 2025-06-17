import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailActivityPlanResponsible } from 'src/core/domains/DetailActivityPlanResponsible/DetailActivityPlanResponsible';
import { IDetailActivityPlanResponsibleRepository } from 'src/core/domainServices/DetailActivityPlanResponsible/IDetailActivityPlanResponsibleRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class DetailActivityPlanResponsibleRepository
    extends GeneralDtoRepository
    implements IDetailActivityPlanResponsibleRepository
{
    constructor(
        @InjectRepository(DetailActivityPlanResponsible)
        detailActivityPlanResponsibleRepository: Repository<DetailActivityPlanResponsible>,
    ) {
        super(detailActivityPlanResponsibleRepository);
    }

    async createDetailActivityPlanResponsible(data) {
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
