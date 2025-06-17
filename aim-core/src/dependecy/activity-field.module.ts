import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityFieldService } from 'src/core/applicationServices/ActivityField/ActivityFieldService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';
import { ActivityFieldRepository } from 'src/infrastructure/repositories/ActivityField/ActivityFieldRepository';
import { ActivityFieldController } from 'src/ui/Portal/ActivityField/ActivityFieldController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.ACTIVITYFIELD_SERVICE,
            useClass: ActivityFieldService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.ACTIVITYFIELD_REPOSITORY,
            useClass: ActivityFieldRepository,
        },
    ],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.ACTIVITYFIELD_SERVICE,
            useClass: ActivityFieldService,
        },
    ],
    controllers: [ActivityFieldController],
    imports: [TypeOrmModule.forFeature([ActivityField])],
})
export class ActivityFieldModule {}
