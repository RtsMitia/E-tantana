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
import { IActivityPlanService } from 'src/core/applicationServices/ActivityPlan/IActivityPlanService';
import { GlobalActivityPlan } from 'src/core/domains/GlobalActivityPlan/GlobalActivityPlan';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('activityPlans')
export class ActivityPlanController {
    props = [
        {
            property: 'ActivityPlan.activityField',
            alias: 'activityField',
        },
        {
            property: 'ActivityPlan.activityFieldSection',
            alias: 'activityFieldSection',
        },
        { property: 'ActivityPlan.activityYear', alias: 'activityYear' },
    ];

    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYPLAN_SERVICE)
        private activityPlanService: IActivityPlanService,
    ) {}

    @Put(':id')
    async updateActivityPlan(
        @Param('id') id: number,
        @Body() activityPlan: any,
    ) {
        return {
            activityPlan: await this.activityPlanService.update(
                id,
                activityPlan,
            ),
        };
    }

    @Post()
    async insertActivityPlan(@Body() activityPlan: GlobalActivityPlan) {
        return {
            activityPlan: await this.activityPlanService.createActivityPlan(
                activityPlan,
            ),
        };
    }

    @Delete(':id')
    async deleteActivityPlan(@Param('id') id: number) {
        return {
            activityPlan: await this.activityPlanService.delete(id),
        };
    }

    @Get(':id')
    async getActivityPlan(@Param('id') id: number) {
        return {
            activityPlan: await this.activityPlanService.fetchById(
                id,
                this.props,
            ),
        };
    }

    @Get()
    getAllMemberActivities(@Query() query: any) {
        return this.activityPlanService.fetchAllWithCriteria(query, this.props);
    }
}
