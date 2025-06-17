import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Query,
    Inject,
} from '@nestjs/common';
import { ISacrementService } from 'src/core/applicationServices/Sacrement/ISacrementService';
import { Sacrement } from 'src/core/domains/Sacrement/Sacrement';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('sacrements')
export class SacrementController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.SACREMENT_SERVICE)
        private sacrementService: ISacrementService,
    ) {}

    @Put(':id')
    async updateSacrement(@Param('id') id: number, @Body() sacrement: any) {
        return {
            sacrement: await this.sacrementService.update(id, sacrement),
        };
    }

    @Post()
    async insertSacrement(@Body() sacrement: Sacrement) {
        return {
            sacrement: await this.sacrementService.save(sacrement),
        };
    }

    @Delete(':id')
    async deleteSacrement(@Param('id') id: number) {
        return {
            sacrement: await this.sacrementService.delete(id),
        };
    }

    @Get(':id')
    async getSacrement(@Param('id') id: number) {
        return {
            sacrement: await this.sacrementService.fetchById(id),
        };
    }

    @Get()
    getAllSacrements(@Query() query: any) {
        return this.sacrementService.fetchAll();
    }
}
