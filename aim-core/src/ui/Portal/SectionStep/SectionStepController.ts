import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ISectionStepService } from 'src/core/applicationServices/SectionStep/ISectionStepService';
import { SectionStep } from 'src/core/domains/SectionStep/SectionStep';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('sectionSteps')
export class SectionStepController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.SECTIONSTEP_SERVICE)
        private sectionStepService: ISectionStepService,
    ) {}

    @Put(':id')
    async updateSectionStep(@Param('id') id: number, @Body() sectionStep: any) {
        return {
            sectionStep: await this.sectionStepService.update(id, sectionStep),
        };
    }

    @Post()
    async insertSectionStep(@Body() sectionStep: SectionStep) {
        return {
            sectionStep: await this.sectionStepService.save(sectionStep),
        };
    }

    @Delete(':id')
    async deleteSectionStep(@Param('id') id: number) {
        return {
            sectionStep: await this.sectionStepService.delete(id),
        };
    }

    @Get(':id')
    async getSectionStep(@Param('id') id: number) {
        return {
            sectionStep: await this.sectionStepService.fetchSectionStepById(id),
        };
    }

    @Get()
    getAllSectionSteps(@Query() query: any) {
        return this.sectionStepService.fetchAllSectionStepsWithCriteria(query);
    }
}
