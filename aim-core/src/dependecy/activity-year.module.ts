import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityYearService } from 'src/core/applicationServices/ActivityYear/ActivityYearService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ActivityYear } from 'src/core/domains/ActivityYear/ActivityYear';
import { ActivityYearRepository } from 'src/infrastructure/repositories/ActivityYear/ActivityYearRepository';
import { ActivityYearController } from 'src/ui/Portal/ActivityYear/ActivityYearController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.ACTIVITYYEAR_SERVICE,
            useClass: ActivityYearService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.ACTIVITYYEAR_REPOSITORY,
            useClass: ActivityYearRepository,
        },
    ],
    controllers: [ActivityYearController],
    imports: [TypeOrmModule.forFeature([ActivityYear])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.ACTIVITYYEAR_SERVICE,
            useClass: ActivityYearService,
        },
    ],
})
export class ActivityYearModule {}
