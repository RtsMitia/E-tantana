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
import { IHierarchyService } from 'src/core/applicationServices/Hierarchy/IHierarchyService';
import { Hierarchy } from 'src/core/domains/Hierarchy/Hierarchy';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('hierarchies')
export class HierarchyController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.HIERARCHY_SERVICE)
        private hierarchyService: IHierarchyService,
    ) {}

    @Get()
    async findAll() {
        return {
            hierarchies: await this.hierarchyService.fetchAllHierarchies(),
        };
    }

    @Get('hierarchies')
    async getHierarchies() {
        return {
            hierarchies: await this.hierarchyService.fetchHierarchies(),
        };
    }

    @Get(':id')
    async findOneMemberRole(@Param('id') id: number) {
        return { hierarchy: await this.hierarchyService.fetchById(id) };
    }

    @Post()
    async addMemberRole(@Body() hierarchy: Hierarchy) {
        return { hierarchy: await this.hierarchyService.save(hierarchy) };
    }

    @Put(':id')
    updateMemberRole(@Param('id') id: number, @Body() memberRole: any) {
        return this.hierarchyService.update(id, memberRole);
    }

    @Delete(':id')
    async deleteMemebrRole(@Param('id') id: number) {
        return { hierarchy: await this.hierarchyService.delete(id) };
    }
}
