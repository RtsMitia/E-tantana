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
import { ISectionService } from 'src/core/applicationServices/Section/ISectionService';
import { Section } from 'src/core/domains/Section/Section';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('sections')
export class SectionController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.SECTION_SERVICE)
        private sectionService: ISectionService,
    ) {}

    @Get(':id')
    async fetchOne(@Param('id') id: number) {
        return {
            section: await this.sectionService.fetchById(id),
        };
    }

    @Get()
    async fetchAll() {
        return {
            sections: await this.sectionService.fetchAll(),
        };
    }

    @Post()
    async createSection(@Body() section: Section) {
        return {
            section: await this.sectionService.save(section),
        };
    }

    @Put(':id')
    async updateSection(@Body() data: any, @Param('id') id: number) {
        return this.sectionService.update(id, data);
    }

    @Delete(':id')
    async deleteSection(@Param('id') id: number) {
        return this.sectionService.delete(id);
    }
}
