import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ActivityFieldLocation } from 'src/core/domains/ActivityFieldLocation/ActivityFieldLocation';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { IActivityFieldLocationRepository } from 'src/core/domainServices/ActivityFieldLocation/IActivityFieldLocationRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IActivityFieldLocationService } from './IActivityFieldLocationService';

@Injectable()
export class ActivityFieldLocationService
    extends GeneralDtoService
    implements IActivityFieldLocationService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.ACTIVITYFIELDLOCATION_REPOSITORY)
        private readonly activityFieldLocation: IActivityFieldLocationRepository,
    ) {
        super(activityFieldLocation);
    }

    fetchById(
        id: number,
        properties: JoinProperties[],
    ): Promise<ActivityFieldLocation> {
        return this.activityFieldLocation.findById(id, properties);
    }

    fetchAllWithCriteria(
        criteria: any,
        properties?: JoinProperties[],
    ): Promise<Record<string, any>> {
        return this.activityFieldLocation.findAllWithCriteria(
            criteria,
            properties,
        );
    }

    fetchAllDiosezyWithGeometry(): Promise<any[]> {
        return this.activityFieldLocation.findAllDiosezyWithGeometry();
    }
}
