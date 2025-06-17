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
import { IProjectActivityService } from 'src/core/applicationServices/ProjectActivity/IProjectActivityService';
import { ProjectActivity } from 'src/core/domains/ProjectActivity/ProjectActivity';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('projectActivities')
export class ProjectActivityController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTACTIVITY_SERVICE)
        private projectActivityService: IProjectActivityService,
    ) {}

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return {
            projectActivity: await this.projectActivityService.fetchById(id),
        };
    }

    @Get()
    async fetchAll() {
        return {
            projectActivitys: await this.projectActivityService.fetchAll(),
        };
    }

    @Post()
    async create(@Body() projectActivity: ProjectActivity) {
        return {
            projectActivity: await this.projectActivityService.save(
                projectActivity,
            ),
        };
    }

    @Put(':id')
    async update(@Body() data: any, @Param('id') id: number) {
        return this.projectActivityService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.projectActivityService.delete(id);
    }
}
