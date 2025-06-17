import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailActivityPlanResponsibleService } from 'src/core/applicationServices/DetailActivityPlanResponsible/DetailActivityPlanResponsibleService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { DetailActivityPlanResponsible } from 'src/core/domains/DetailActivityPlanResponsible/DetailActivityPlanResponsible';
import { DetailActivityPlanResponsibleRepository } from 'src/infrastructure/repositories/DetailActivityPlanResponsible/DetailActivityPlanResponsibleRepository';
import { DetailActivityPlanResponsibleController } from 'src/ui/Portal/DetailActivityPlanResponsible/DetailActivityPlanResponsibleController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide:
                SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLANRESPONSIBLE_SERVICE,
            useClass: DetailActivityPlanResponsibleService,
        },
        {
            provide:
                REPOSITORY_MAPPING_TOKEN.DETAILACTIVITYPLANRESPONSIBLE_REPOSITORY,
            useClass: DetailActivityPlanResponsibleRepository,
        },
    ],
    controllers: [DetailActivityPlanResponsibleController],
    imports: [TypeOrmModule.forFeature([DetailActivityPlanResponsible])],
    exports: [
        {
            provide:
                SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLANRESPONSIBLE_SERVICE,
            useClass: DetailActivityPlanResponsibleService,
        },
    ],
})
export class DetailActivityPlanResponsibleModule {}
