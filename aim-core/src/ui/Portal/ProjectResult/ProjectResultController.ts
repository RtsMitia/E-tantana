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
import { IProjectResultService } from 'src/core/applicationServices/ProjectResult/IProjectResultService';
import { ProjectResult } from 'src/core/domains/ProjectResult/ProjectResult';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('projectResults')
export class ProjectResultController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTRESULT_SERVICE)
        private projectResultService: IProjectResultService,
    ) {}

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return {
            projectResult: await this.projectResultService.fetchById(id),
        };
    }

    @Get()
    async fetchAll() {
        return {
            projectResults: await this.projectResultService.fetchAll(),
        };
    }

    @Post()
    async create(@Body() projectResult: ProjectResult) {
        return {
            projectResult: await this.projectResultService.save(projectResult),
        };
    }

    @Put(':id')
    async update(@Body() data: any, @Param('id') id: number) {
        return this.projectResultService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.projectResultService.delete(id);
    }
}
