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
import { IAdultInfoService } from 'src/core/applicationServices/AdultInfo/IAdultInfoService';
import { AdultInfo } from 'src/core/domains/AdultInfo/AdultInfo';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('adult-info')
export class AdultInfoController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.ADULTINFO_SERVICE)
        private adultInfoService: IAdultInfoService,
    ) {}

    @Put(':id')
    async updateAdultInfo(@Param('id') id: number, @Body() adultInfo: any) {
        return {
            adultInfo: await this.adultInfoService.update(id, adultInfo),
        };
    }

    @Post()
    async insertAdultInfo(@Body() adultInfo: AdultInfo) {
        return {
            adultInfo: await this.adultInfoService.saveAdultInfo(adultInfo),
        };
    }

    @Delete(':id')
    async deleteAdultInfo(@Param('id') id: number) {
        return {
            adultInfo: await this.adultInfoService.delete(id),
        };
    }

    @Get(':id')
    async getAdultInfo(@Param('id') id: number) {
        return {
            adultInfo: await this.adultInfoService.fetchAdultInfoById(id),
        };
    }

    @Get()
    getAllAdultInfos(@Query() query: any) {
        return this.adultInfoService.fetchAllAdultInfosWithCriteria(query);
    }
}
