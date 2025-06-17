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
import { IYouthInfoService } from 'src/core/applicationServices/YouthInfo/IYouthInfoService';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { YouthInfo } from 'src/core/domains/YouthInfo/YouthInfo';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Controller('youthInfo')
export class YouthInfoController {
    joinProperties: JoinProperties[] = [
        {
            property: 'YouthInfo.member',
            alias: 'member',
        },
    ];

    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.YOUTHINFO_SERVICE)
        private youthInfoService: IYouthInfoService,
    ) {}

    @Get()
    async findAll(@Body() criteria: any) {
        return {
            activityFields: await this.youthInfoService.fetchAllWithCriteria(
                criteria,
                this.joinProperties,
            ),
        };
    }

    @Get(':id')
    async fetchOne(@Param('id') id: number) {
        return {
            activityField: await this.youthInfoService.fetchById(
                id,
                this.joinProperties,
            ),
        };
    }

    @Post()
    async add(@Body() youthInfo: YouthInfo) {
        return { activityField: await this.youthInfoService.save(youthInfo) };
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() memberRole: any) {
        return this.youthInfoService.update(id, memberRole);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return { activityField: await this.youthInfoService.delete(id) };
    }
}
