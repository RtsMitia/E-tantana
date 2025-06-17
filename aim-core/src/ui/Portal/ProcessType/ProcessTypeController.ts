import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Inject,
} from '@nestjs/common';
import { IProcessTypeService } from 'src/core/applicationServices/ProcessType/IProcessTypeService';
import { ProcessType } from 'src/core/domains/ProcessType/ProcessType';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('processTypes')
export class ProcessTypeController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PROCESSTYPE_SERVICE)
        private processTypeService: IProcessTypeService,
    ) {}

    @Put(':id')
    async updateProcessType(@Param('id') id: number, @Body() processType: any) {
        return {
            processType: await this.processTypeService.update(id, processType),
        };
    }

    @Post()
    async insertProcessType(@Body() processType: ProcessType) {
        return {
            processType: await this.processTypeService.save(processType),
        };
    }

    @Delete(':id')
    async deleteProcessType(@Param('id') id: number) {
        return {
            processType: await this.processTypeService.delete(id),
        };
    }

    @Get(':id')
    async getProcessType(@Param('id') id: number) {
        return {
            processType: await this.processTypeService.fetchById(id),
        };
    }

    @Get()
    getAllProcessTypes() {
        return this.processTypeService.fetchAll();
    }
}
