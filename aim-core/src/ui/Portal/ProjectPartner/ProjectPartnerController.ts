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
import { IProjectPartnerService } from 'src/core/applicationServices/ProjectPartner/IProjectPartnerService';
import { ProjectPartner } from 'src/core/domains/ProjectPartner/ProjectPartner';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('projectPartners')
export class ProjectPartnerController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PROJECTPARTNER_SERVICE)
        private projectPartnerService: IProjectPartnerService,
    ) {}

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return {
            projectPartner: await this.projectPartnerService.fetchById(id),
        };
    }

    @Get()
    async fetchAll() {
        return {
            projectPartners: await this.projectPartnerService.fetchAll(),
        };
    }

    @Post()
    async create(@Body() projectPartner: ProjectPartner) {
        return {
            projectPartner: await this.projectPartnerService.save(
                projectPartner,
            ),
        };
    }

    @Put(':id')
    async update(@Body() data: any, @Param('id') id: number) {
        return this.projectPartnerService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.projectPartnerService.delete(id);
    }
}
