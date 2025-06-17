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
import { IProjectTargetService } from 'src/core/applicationServices/ProjectTarget/IProjectTargetService';
import { ProjectTarget } from 'src/core/domains/ProjectTarget/ProjectTarget';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('projectTargets')
export class ProjectTargetController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTTARGET_SERVICE)
        private projectTargetService: IProjectTargetService,
    ) {}

    @Get(':id')
    async fetchOne(@Param('id') id: number) {
        return {
            projectTarget: await this.projectTargetService.fetchById(id),
        };
    }

    @Get()
    async fetchAll(@Query() criteria: any) {
        return {
            projectTargets:
                await this.projectTargetService.fetchAllWithCriteria(criteria),
        };
    }

    @Post()
    async create(@Body() projectTarget: ProjectTarget) {
        return {
            projectTarget: await this.projectTargetService.save(projectTarget),
        };
    }

    @Put(':id')
    async update(@Body() data: any, @Param('id') id: number) {
        return this.projectTargetService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.projectTargetService.delete(id);
    }
}
