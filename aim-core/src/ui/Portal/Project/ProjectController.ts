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
import { IProjectService } from 'src/core/applicationServices/Project/IProjectService';
import { GlobalProject } from 'src/core/domains/GlobalProject/GlobalProject';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('projects')
export class ProjectController {
    joinProperties: JoinProperties[] = [
        {
            property: 'Project.project_target',
            alias: 'projectTarget',
        },
        {
            property: 'Project.projectActivities',
            alias: 'projectActivities',
        },
        {
            property: 'Project.projectPartners',
            alias: 'projectPartners',
        },
        {
            property: 'Project.projectManagers',
            alias: 'projectManagers',
        },
        {
            property: 'Project.projectResults',
            alias: 'projectResults',
        },
        {
            property: 'Project.projectGoals',
            alias: 'projectGoals',
        },
        {
            property: 'projectActivities.projectTools',
            alias: 'projectTools',
        },
    ];

    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PROJECT_SERVICE)
        private projectService: IProjectService,
    ) {}

    @Get('invalid')
    async getInvalidProject(@Query() criteria: any) {
        return await this.projectService.fetchProjectNotValidated(criteria);
    }

    @Put('validate/:id')
    async validate(@Param('id') id: number) {
        return this.projectService.validateProject(id);
    }

    @Put('invalidate/:id')
    async invalidate(@Param('id') id: number) {
        return this.projectService.invalidateProject(id);
    }

    @Get()
    async getProjects(@Query() criteria: any) {
        return await this.projectService.fetchAllWithCriteria(
            criteria,
            this.joinProperties,
        );
    }

    @Get(':id')
    async getProject(@Param('id') id: number) {
        return {
            project: await this.projectService.fetchById(
                id,
                this.joinProperties,
            ),
        };
    }

    @Post()
    async createProject(@Body() project: GlobalProject) {
        return await this.projectService.createProject(project);
    }

    @Put(':id')
    async updateProject(@Param('id') id: number, data: any) {
        return await this.projectService.update(id, data);
    }

    @Delete(':id')
    async deleteProject(@Param('id') id: number) {
        return await this.projectService.delete(id);
    }
}
