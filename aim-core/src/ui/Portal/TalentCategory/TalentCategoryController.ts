import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ITalentCategoryService } from 'src/core/applicationServices/TalentCategory/ITalentCategoryService';
import { TalentCategory } from 'src/core/domains/TalentCategory/TalentCategory';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('talentCategories')
export class TalentCategoryController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.TALENTCATEGORY_SERVICE)
        private talentCategoryService: ITalentCategoryService,
    ) {}

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return {
            talentCategory: await this.talentCategoryService.fetchById(id),
        };
    }

    @Get()
    async fetchAll() {
        return {
            talentCategorys: await this.talentCategoryService.fetchAll(),
        };
    }

    @Post()
    async create(@Body() talentCategory: TalentCategory) {
        return {
            talentCategory: await this.talentCategoryService.save(
                talentCategory,
            ),
        };
    }

    @Put(':id')
    async update(@Body() data: any, @Param('id') id: number) {
        return this.talentCategoryService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.talentCategoryService.delete(id);
    }
}
