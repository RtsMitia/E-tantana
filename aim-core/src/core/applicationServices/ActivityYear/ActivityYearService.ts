import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ActivityYear } from 'src/core/domains/ActivityYear/ActivityYear';
import { IActivityYearRepository } from 'src/core/domainServices/ActivityYear/IActivityYearRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IActivityYearService } from './IActivityYearService';

@Injectable()
export class ActivityYearService
    extends GeneralDtoService
    implements IActivityYearService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.ACTIVITYYEAR_REPOSITORY)
        private readonly activityYearRepository: IActivityYearRepository,
    ) {
        super(activityYearRepository);
    }

    async fetchActivityYear(data: any): Promise<ActivityYear> {
        return await this.activityYearRepository.findActivityYear(data);
    }

    async statisticGlobal(criteria: any) {
        return await this.activityYearRepository.statisticGlobal(criteria);
    }

    async paymentStatisticByYear(criteria: any) {
        return await this.activityYearRepository.paymentStatisticByYear(
            criteria,
        );
    }
}
