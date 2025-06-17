import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalentCategoryService } from 'src/core/applicationServices/TalentCategory/TalentCategoryService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { TalentCategory } from 'src/core/domains/TalentCategory/TalentCategory';
import { TalentCategoryRepository } from 'src/infrastructure/repositories/TalentCategory/TalentCategoryRepository';
import { TalentCategoryController } from 'src/ui/Portal/TalentCategory/TalentCategoryController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.TALENTCATEGORY_SERVICE,
            useClass: TalentCategoryService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.TALENTCATEGORY_REPOSITORY,
            useClass: TalentCategoryRepository,
        },
    ],
    controllers: [TalentCategoryController],
    imports: [TypeOrmModule.forFeature([TalentCategory])],
})
export class TalentCategoryModule {}
