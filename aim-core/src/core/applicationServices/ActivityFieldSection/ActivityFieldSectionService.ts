import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IActivityFieldSectionRepository } from 'src/core/domainServices/ActivityFieldSection/IActivityFieldSectionRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IActivityFieldSectionService } from './IActivityFieldSectionService';

@Injectable()
export class ActivityFieldSectionService
    extends GeneralDtoService
    implements IActivityFieldSectionService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.ACTIVITYFIELDSECTION_REPOSITORY)
        private readonly activityFieldSectionRepository: IActivityFieldSectionRepository,
    ) {
        super(activityFieldSectionRepository);
    }

    async fetchAllActivityFieldSectionsWithCriteria(
        criteria,
    ): Promise<unknown> {
        return await this.activityFieldSectionRepository.findAllActivityFieldSectionsWithCriteria(
            criteria,
        );
    }

    async fetchActivityFieldSectionById(id: number): Promise<unknown> {
        return await this.activityFieldSectionRepository.findActivityFieldSectionById(
            id,
        );
    }
}
