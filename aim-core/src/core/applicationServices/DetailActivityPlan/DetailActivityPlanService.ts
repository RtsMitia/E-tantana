import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IDetailActivityPlanRepository } from 'src/core/domainServices/DetailActivityPlan/IDetailActivityPlanRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IDetailActivityPlanService } from './IDetailActivityPlanService';

@Injectable()
export class DetailActivityPlanService
    extends GeneralDtoService
    implements IDetailActivityPlanService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.DETAILACTIVITYPLAN_REPOSITORY)
        private readonly detailActivityPlanRepository: IDetailActivityPlanRepository,
    ) {
        super(detailActivityPlanRepository);
    }

    async createDetailActivityPlan(data) {
        return await this.detailActivityPlanRepository.createDetailActivityPlan(
            data,
        );
    }
}
