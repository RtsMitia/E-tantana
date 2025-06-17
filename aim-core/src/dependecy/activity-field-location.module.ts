import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityFieldLocationService } from 'src/core/applicationServices/ActivityFieldLocation/ActivityFieldLocationService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ActivityFieldLocation } from 'src/core/domains/ActivityFieldLocation/ActivityFieldLocation';
import { ActivityFieldLocationRepository } from 'src/infrastructure/repositories/ActivityFieldLocation/ActivityFieldLocationRepository';
import { ActivityFieldLocationController } from 'src/ui/Portal/ActivityFieldLocation/ActivityFieldLocationController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.ACTIVITYFIELDLOCATION_SERVICE,
            useClass: ActivityFieldLocationService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.ACTIVITYFIELDLOCATION_REPOSITORY,
            useClass: ActivityFieldLocationRepository,
        },
    ],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.ACTIVITYFIELDLOCATION_SERVICE,
            useClass: ActivityFieldLocationService,
        },
    ],
    controllers: [ActivityFieldLocationController],
    imports: [TypeOrmModule.forFeature([ActivityFieldLocation])],
})
export class ActivityFieldLocationModule {}
