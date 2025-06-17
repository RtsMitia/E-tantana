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
import { IProjectToolService } from 'src/core/applicationServices/ProjectTool/IProjectToolService';
import { ProjectTool } from 'src/core/domains/ProjectTool/ProjectTool';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('projectTools')
export class ProjectToolController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTTOOL_SERVICE)
        private projectToolService: IProjectToolService,
    ) {}

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return {
            projectTool: await this.projectToolService.fetchById(id),
        };
    }

    @Get()
    async fetchAll() {
        return {
            projectTools: await this.projectToolService.fetchAll(),
        };
    }

    @Post()
    async create(@Body() projectTool: ProjectTool) {
        return {
            projectTool: await this.projectToolService.save(projectTool),
        };
    }

    @Put(':id')
    async update(@Body() data: any, @Param('id') id: number) {
        return this.projectToolService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.projectToolService.delete(id);
    }
}
