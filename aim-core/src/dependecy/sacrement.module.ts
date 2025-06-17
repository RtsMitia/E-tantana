import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SacrementService } from 'src/core/applicationServices/Sacrement/SacrementService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { Sacrement } from 'src/core/domains/Sacrement/Sacrement';
import { SacrementRepository } from 'src/infrastructure/repositories/Sacrement/SacrementRepository';
import { SacrementController } from 'src/ui/Portal/Sacrement/SacrementController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.SACREMENT_SERVICE,
            useClass: SacrementService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.SACREMENT_REPOSITORY,
            useClass: SacrementRepository,
        },
    ],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.SACREMENT_SERVICE,
            useClass: SacrementService,
        },
    ],
    controllers: [SacrementController],
    imports: [TypeOrmModule.forFeature([Sacrement])],
})
export class SacrementModule {}
