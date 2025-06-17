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
import { IDetailActivityPlanResponsibleService } from 'src/core/applicationServices/DetailActivityPlanResponsible/IDetailActivityPlanResponsibleService';
import { DetailActivityPlanResponsible } from 'src/core/domains/DetailActivityPlanResponsible/DetailActivityPlanResponsible';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Controller('detailActivityPlanResponsibles')
export class DetailActivityPlanResponsibleController {
    props = [
        {
            property: 'DetailActivityPlanResponsible.detailActivityPlan',
            alias: 'detailActivityPlan',
        },
        {
            property: 'DetailActivityPlanResponsible.adultInfo',
            alias: 'adultInfo',
        },
    ];

    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLANRESPONSIBLE_SERVICE)
        private detailActivityPlanResponsibleService: IDetailActivityPlanResponsibleService,
    ) {}

    @Put(':id')
    async updateDetailActivityPlanResponsible(
        @Param('id') id: number,
        @Body() detailActivityPlanResponsible: any,
    ) {
        return {
            detailActivityPlanResponsible:
                await this.detailActivityPlanResponsibleService.update(
                    id,
                    detailActivityPlanResponsible,
                ),
        };
    }

    @Post()
    async insertDetailActivityPlanResponsible(
        @Body() detailActivityPlanResponsible: DetailActivityPlanResponsible,
    ) {
        return {
            detailActivityPlanResponsible:
                await this.detailActivityPlanResponsibleService.createDetailActivityPlanResponsible(
                    detailActivityPlanResponsible,
                ),
        };
    }

    @Delete(':id')
    async deleteDetailActivityPlanResponsible(@Param('id') id: number) {
        return {
            detailActivityPlanResponsible:
                await this.detailActivityPlanResponsibleService.delete(id),
        };
    }

    @Get(':id')
    async getDetailActivityPlanResponsible(@Param('id') id: number) {
        return {
            detailActivityPlanResponsible:
                await this.detailActivityPlanResponsibleService.fetchById(
                    id,
                    this.props,
                ),
        };
    }

    @Get()
    getAllMemberActivities(@Query() query: any) {
        return this.detailActivityPlanResponsibleService.fetchAllWithCriteria(
            query,
            this.props,
        );
    }
}
