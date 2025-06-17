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
import { IDetailActivityPlanService } from 'src/core/applicationServices/DetailActivityPlan/IDetailActivityPlanService';
import { DetailActivityPlan } from 'src/core/domains/DetailActivityPlan/DetailActivityPlan';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('detailActivityPlans')
export class DetailActivityPlanController {
    props = [
        {
            property: 'DetailActivityPlan.activityPlan',
            alias: 'activityPlan',
        },
    ];

    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLAN_SERVICE)
        private detailActivityPlanService: IDetailActivityPlanService,
    ) {}

    @Put(':id')
    async updateDetailActivityPlan(
        @Param('id') id: number,
        @Body() detailActivityPlan: any,
    ) {
        return {
            detailActivityPlan: await this.detailActivityPlanService.update(
                id,
                detailActivityPlan,
            ),
        };
    }

    @Post()
    async insertDetailActivityPlan(
        @Body() detailActivityPlan: DetailActivityPlan,
    ) {
        return {
            detailActivityPlan:
                await this.detailActivityPlanService.createDetailActivityPlan(
                    detailActivityPlan,
                ),
        };
    }

    @Delete(':id')
    async deleteDetailActivityPlan(@Param('id') id: number) {
        return {
            detailActivityPlan: await this.detailActivityPlanService.delete(id),
        };
    }

    @Get(':id')
    async getDetailActivityPlan(@Param('id') id: number) {
        return {
            detailActivityPlan: await this.detailActivityPlanService.fetchById(
                id,
                this.props,
            ),
        };
    }

    @Get()
    getAllMemberActivities(@Query() query: any) {
        return this.detailActivityPlanService.fetchAllWithCriteria(
            query,
            this.props,
        );
    }
}
