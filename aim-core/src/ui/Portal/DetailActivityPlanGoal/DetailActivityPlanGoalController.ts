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
import { IDetailActivityPlanGoalService } from 'src/core/applicationServices/DetailActivityPlanGoal/IDetailActivityPlanGoalService';
import { DetailActivityPlanGoal } from 'src/core/domains/DetailActivityPlanGoal/DetailActivityPlanGoal';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('detailActivityPlanGoals')
export class DetailActivityPlanGoalController {
    props = [
        {
            property: 'DetailActivityPlanGoal.detailActivityPlan',
            alias: 'detailActivityPlan',
        },
        {
            property: 'DetailActivityPlanGoal.educationGoal',
            alias: 'educationGoal',
        },
    ];

    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLANGOAL_SERVICE)
        private detailActivityPlanGoalService: IDetailActivityPlanGoalService,
    ) {}

    @Put(':id')
    async updateDetailActivityPlanGoal(
        @Param('id') id: number,
        @Body() detailActivityPlanGoal: any,
    ) {
        return {
            detailActivityPlanGoal:
                await this.detailActivityPlanGoalService.update(
                    id,
                    detailActivityPlanGoal,
                ),
        };
    }

    @Post()
    async insertDetailActivityPlanGoal(
        @Body() detailActivityPlanGoal: DetailActivityPlanGoal,
    ) {
        return {
            detailActivityPlanGoal:
                await this.detailActivityPlanGoalService.createDetailActivityPlanGoal(
                    detailActivityPlanGoal,
                ),
        };
    }

    @Delete(':id')
    async deleteDetailActivityPlanGoal(@Param('id') id: number) {
        return {
            detailActivityPlanGoal:
                await this.detailActivityPlanGoalService.delete(id),
        };
    }

    @Get(':id')
    async getDetailActivityPlanGoal(@Param('id') id: number) {
        return {
            detailActivityPlanGoal:
                await this.detailActivityPlanGoalService.fetchById(
                    id,
                    this.props,
                ),
        };
    }

    @Get()
    getAllMemberActivities(@Query() query: any) {
        return this.detailActivityPlanGoalService.fetchAllWithCriteria(
            query,
            this.props,
        );
    }
}
