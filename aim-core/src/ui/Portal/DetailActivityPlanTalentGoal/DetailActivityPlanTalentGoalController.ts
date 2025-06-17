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
import { IDetailActivityPlanTalentGoalService } from 'src/core/applicationServices/DetailActivityPlanTalentGoal/IDetailActivityPlanTalentGoalService';
import { DetailActivityPlanTalentGoal } from 'src/core/domains/DetailActivityPlanTalentGoal/DetailActivityPlanTalentGoal';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('detailActivityPlanTalentGoals')
export class DetailActivityPlanTalentGoalController {
    props = [
        {
            property: 'DetailActivityPlanTalentGoal.detailActivityPlan',
            alias: 'detailActivityPlan',
        },
        {
            property: 'DetailActivityPlanTalentGoal.talentGoal',
            alias: 'talentGoal',
        },
    ];

    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLANTALENTGOAL_SERVICE)
        private detailActivityPlanTalentGoalService: IDetailActivityPlanTalentGoalService,
    ) {}

    @Put(':id')
    async updateDetailActivityPlanTalentGoal(
        @Param('id') id: number,
        @Body() detailActivityPlanTalentGoal: any,
    ) {
        return {
            detailActivityPlanTalentGoal:
                await this.detailActivityPlanTalentGoalService.update(
                    id,
                    detailActivityPlanTalentGoal,
                ),
        };
    }

    @Post()
    async insertDetailActivityPlanTalentGoal(
        @Body() detailActivityPlanTalentGoal: DetailActivityPlanTalentGoal,
    ) {
        return {
            detailActivityPlanTalentGoal:
                await this.detailActivityPlanTalentGoalService.createDetailActivityPlanTalentGoal(
                    detailActivityPlanTalentGoal,
                ),
        };
    }

    @Delete(':id')
    async deleteDetailActivityPlanTalentGoal(@Param('id') id: number) {
        return {
            detailActivityPlanTalentGoal:
                await this.detailActivityPlanTalentGoalService.delete(id),
        };
    }

    @Get(':id')
    async getDetailActivityPlanTalentGoal(@Param('id') id: number) {
        return {
            detailActivityPlanTalentGoal:
                await this.detailActivityPlanTalentGoalService.fetchById(
                    id,
                    this.props,
                ),
        };
    }

    @Get()
    getAllMemberActivities(@Query() query: any) {
        return this.detailActivityPlanTalentGoalService.fetchAllWithCriteria(
            query,
            this.props,
        );
    }
}
