import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityFieldSectionService } from 'src/core/applicationServices/ActivityFieldSection/ActivityFieldSectionService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ActivityFieldSection } from 'src/core/domains/ActivityFieldSection/ActivityFieldSection';
import { ActivityFieldSectionRepository } from 'src/infrastructure/repositories/ActivityFieldSection/ActivityFieldSectionRepository';
import { ActivityFieldSectionController } from 'src/ui/Portal/ActivityFieldSection/ActivityFieldSectionController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.ACTIVITYFIELDSECTION_SERVICE,
            useClass: ActivityFieldSectionService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.ACTIVITYFIELDSECTION_REPOSITORY,
            useClass: ActivityFieldSectionRepository,
        },
    ],
    controllers: [ActivityFieldSectionController],
    imports: [TypeOrmModule.forFeature([ActivityFieldSection])],
})
export class ActivityFieldSectionModule {}
