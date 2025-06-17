import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailActivityPlanService } from 'src/core/applicationServices/DetailActivityPlan/DetailActivityPlanService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { DetailActivityPlan } from 'src/core/domains/DetailActivityPlan/DetailActivityPlan';
import { DetailActivityPlanRepository } from 'src/infrastructure/repositories/DetailActivityPlan/DetailActivityPlanRepository';
import { DetailActivityPlanController } from 'src/ui/Portal/DetailActivityPlan/DetailActivityPlanController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLAN_SERVICE,
            useClass: DetailActivityPlanService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.DETAILACTIVITYPLAN_REPOSITORY,
            useClass: DetailActivityPlanRepository,
        },
    ],
    controllers: [DetailActivityPlanController],
    imports: [TypeOrmModule.forFeature([DetailActivityPlan])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLAN_SERVICE,
            useClass: DetailActivityPlanService,
        },
    ],
})
export class DetailActivityPlanModule {}
