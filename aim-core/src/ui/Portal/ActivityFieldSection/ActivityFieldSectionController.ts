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
import { IActivityFieldSectionService } from 'src/core/applicationServices/ActivityFieldSection/IActivityFieldSectionService';
import { ActivityFieldSection } from 'src/core/domains/ActivityFieldSection/ActivityFieldSection';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('activityFieldSections')
export class ActivityFieldSectionController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYFIELDSECTION_SERVICE)
        private activityFieldSectionService: IActivityFieldSectionService,
    ) {}

    @Put(':id')
    async updateActivityFieldSection(
        @Param('id') id: number,
        @Body() activityFieldSection: any,
    ) {
        return {
            activityFieldSection: await this.activityFieldSectionService.update(
                id,
                activityFieldSection,
            ),
        };
    }

    @Post()
    async insertActivityFieldSection(
        @Body() activityFieldSection: ActivityFieldSection,
    ) {
        return {
            activityFieldSection: await this.activityFieldSectionService.save(
                activityFieldSection,
            ),
        };
    }

    @Delete(':id')
    async deleteActivityFieldSection(@Param('id') id: number) {
        return {
            activityFieldSection: await this.activityFieldSectionService.delete(
                id,
            ),
        };
    }

    @Get(':id')
    async getActivityFieldSection(@Param('id') id: number) {
        return {
            activityFieldSection:
                await this.activityFieldSectionService.fetchActivityFieldSectionById(
                    id,
                ),
        };
    }

    @Get()
    getAllActivityFieldSections(@Query() query: any) {
        return this.activityFieldSectionService.fetchAllActivityFieldSectionsWithCriteria(
            query,
        );
    }
}
