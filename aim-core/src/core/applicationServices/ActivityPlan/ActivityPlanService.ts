import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { GlobalActivityPlan } from 'src/core/domains/GlobalActivityPlan/GlobalActivityPlan';
import { IActivityPlanRepository } from 'src/core/domainServices/ActivityPlan/IActivityPlanRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IActivityPlanService } from './IActivityPlanService';

@Injectable()
export class ActivityPlanService
    extends GeneralDtoService
    implements IActivityPlanService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.ACTIVITYPLAN_REPOSITORY)
        private readonly activityPlanRepository: IActivityPlanRepository,
    ) {
        super(activityPlanRepository);
    }
    createActivityPlan(data: GlobalActivityPlan) {
        return this.activityPlanRepository.createActivityPlan(data);
    }
}
