import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationFieldService } from 'src/core/applicationServices/EducationField/EducationFieldService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { EducationField } from 'src/core/domains/EducationField/EducationField';
import { EducationFieldRepository } from 'src/infrastructure/repositories/EducationField/EducationFieldRepository';
import { EducationFieldController } from 'src/ui/Portal/EducationField/EducationFieldController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.EDUCATIONFIELD_SERVICE,
            useClass: EducationFieldService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.EDUCATIONFIELD_REPOSITORY,
            useClass: EducationFieldRepository,
        },
        EducationFieldService,
    ],
    controllers: [EducationFieldController],
    imports: [TypeOrmModule.forFeature([EducationField])],
})
export class EducationFieldModule {}
