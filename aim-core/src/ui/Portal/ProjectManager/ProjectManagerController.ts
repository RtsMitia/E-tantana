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
import { IProjectManagerService } from 'src/core/applicationServices/ProjectManager/IProjectManagerService';
import { ProjectManager } from 'src/core/domains/ProjectManager/ProjectManager';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('projectManagers')
export class ProjectManagerController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTMANAGER_SERVICE)
        private projectManagerService: IProjectManagerService,
    ) {}

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return {
            projectManager: await this.projectManagerService.fetchById(id),
        };
    }

    @Get()
    async fetchAll() {
        return {
            projectManagers: await this.projectManagerService.fetchAll(),
        };
    }

    @Post()
    async create(@Body() projectManager: ProjectManager) {
        return {
            projectManager: await this.projectManagerService.save(
                projectManager,
            ),
        };
    }

    @Put(':id')
    async update(@Body() data: any, @Param('id') id: number) {
        return this.projectManagerService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.projectManagerService.delete(id);
    }
}
