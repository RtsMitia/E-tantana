import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { IActivityFieldRepository } from 'src/core/domainServices/ActivityField/IActivityFieldRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IActivityFieldService } from './IActivityFieldService';

@Injectable()
export class ActivityFieldService
    extends GeneralDtoService
    implements IActivityFieldService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.ACTIVITYFIELD_REPOSITORY)
        private readonly activityFieldRepository: IActivityFieldRepository,
    ) {
        super(activityFieldRepository);
    }

    fetchById(
        id: number,
        properties: JoinProperties[],
    ): Promise<ActivityField> {
        return this.activityFieldRepository.findById(id, properties);
    }

    getAllInferiorActivityFields(id) {
        return this.activityFieldRepository.getAllInferiorActivityFields(id);
    }

    fetchActivityFieldsFromSuperiorFieldIdAndHierarchy(data: any) {
        return this.activityFieldRepository.getActivityFieldsFromSuperiorFieldIdAndHierarchy(
            data,
        );
    }

    paymentStatisticByHierarchy(criteria: any) {
        return this.activityFieldRepository.paymentStatisticByHierarchy(
            criteria,
        );
    }

    fetchAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
    ): Promise<Record<string, any>> {
        return this.activityFieldRepository.findAllWithCriteria(
            criteria,
            properties,
        );
    }

    async getSuperiors(id: number) {
        return await this.activityFieldRepository.getSuperiors(id);
    }
}
