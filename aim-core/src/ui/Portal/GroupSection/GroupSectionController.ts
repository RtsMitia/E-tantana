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
import { IGroupSectionService } from 'src/core/applicationServices/GroupSection/IGroupSectionService';
import { GroupSection } from 'src/core/domains/GroupSection/GroupSection';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('groupSections')
export class GroupSectionController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.GROUPSECTION_SERVICE)
        private groupSectionService: IGroupSectionService,
    ) {}

    @Put(':id')
    async updateGroupSection(
        @Param('id') id: number,
        @Body() groupSection: any,
    ) {
        return {
            groupSection: await this.groupSectionService.update(
                id,
                groupSection,
            ),
        };
    }

    @Post()
    async insertGroupSection(@Body() groupSection: GroupSection) {
        return {
            groupSection: await this.groupSectionService.save(groupSection),
        };
    }

    @Delete(':id')
    async deleteGroupSection(@Param('id') id: number) {
        return {
            groupSection: await this.groupSectionService.delete(id),
        };
    }

    @Get(':id')
    async getGroupSection(@Param('id') id: number) {
        return {
            groupSection: await this.groupSectionService.fetchGroupSectionById(
                id,
            ),
        };
    }

    @Get()
    getAllGroupSections(@Query() query: any) {
        return this.groupSectionService.fetchAllGroupSectionsWithCriteria(
            query,
        );
    }
}
