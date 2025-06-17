import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionService } from 'src/core/applicationServices/Section/SectionService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { Section } from 'src/core/domains/Section/Section';
import { SectionRepository } from 'src/infrastructure/repositories/Section/SectionRepository';
import { SectionController } from 'src/ui/Portal/Section/SectionController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.SECTION_SERVICE,
            useClass: SectionService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.SECTION_REPOSITORY,
            useClass: SectionRepository,
        },
    ],
    controllers: [SectionController],
    imports: [TypeOrmModule.forFeature([Section])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.SECTION_SERVICE,
            useClass: SectionService,
        },
    ],
})
export class SectionModule {}
