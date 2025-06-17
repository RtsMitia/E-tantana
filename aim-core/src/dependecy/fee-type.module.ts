import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeeTypeService } from 'src/core/applicationServices/FeeType/FeeTypeService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { FeeType } from 'src/core/domains/FeeType/FeeType';
import { FeeTypeRepository } from 'src/infrastructure/repositories/FeeType/FeeTypeRepository';
import { FeeTypeController } from 'src/ui/Portal/FeeType/FeeTypeController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.FEETYPE_SERVICE,
            useClass: FeeTypeService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.FEETYPE_REPOSITORY,
            useClass: FeeTypeRepository,
        },
    ],
    controllers: [FeeTypeController],
    imports: [TypeOrmModule.forFeature([FeeType])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.FEETYPE_SERVICE,
            useClass: FeeTypeService,
        },
    ],
})
export class FeeTypeModule {}
