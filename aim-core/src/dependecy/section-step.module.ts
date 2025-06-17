import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionStepService } from 'src/core/applicationServices/SectionStep/SectionStepService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { SectionStep } from 'src/core/domains/SectionStep/SectionStep';
import { SectionStepRepository } from 'src/infrastructure/repositories/SectionStep/SectionStepRepository';
import { SectionStepController } from 'src/ui/Portal/SectionStep/SectionStepController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.SECTIONSTEP_SERVICE,
            useClass: SectionStepService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.SECTIONSTEP_REPOSITORY,
            useClass: SectionStepRepository,
        },
        SectionStepService,
    ],
    controllers: [SectionStepController],
    imports: [TypeOrmModule.forFeature([SectionStep])],
})
export class SectionStepModule {}
