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
import { IProjectGoalService } from 'src/core/applicationServices/ProjectGoal/IProjectGoalService';
import { ProjectGoal } from 'src/core/domains/ProjectGoal/ProjectGoal';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('projectGoals')
export class ProjectGoalController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTGOAL_SERVICE)
        private projectGoalService: IProjectGoalService,
    ) {}

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return {
            projectGoal: await this.projectGoalService.fetchById(id),
        };
    }

    @Get()
    async fetchAll() {
        return {
            projectGoals: await this.projectGoalService.fetchAll(),
        };
    }

    @Post()
    async create(@Body() projectGoal: ProjectGoal) {
        return {
            projectGoal: await this.projectGoalService.save(projectGoal),
        };
    }

    @Put(':id')
    async update(@Body() data: any, @Param('id') id: number) {
        return this.projectGoalService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.projectGoalService.delete(id);
    }
}
