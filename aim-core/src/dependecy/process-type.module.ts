import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessTypeService } from 'src/core/applicationServices/ProcessType/ProcessTypeService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ProcessType } from 'src/core/domains/ProcessType/ProcessType';
import { ProcessTypeRepository } from 'src/infrastructure/repositories/ProcessType/ProcessTypeRepository';
import { ProcessTypeController } from 'src/ui/Portal/ProcessType/ProcessTypeController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROCESSTYPE_SERVICE,
            useClass: ProcessTypeService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PROCESSTYPE_REPOSITORY,
            useClass: ProcessTypeRepository,
        },
    ],
    controllers: [ProcessTypeController],
    imports: [TypeOrmModule.forFeature([ProcessType])],
})
export class ProcessTypeModule {}
