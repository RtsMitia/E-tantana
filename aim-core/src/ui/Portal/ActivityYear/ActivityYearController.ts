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
import { IActivityYearService } from 'src/core/applicationServices/ActivityYear/IActivityYearService';
import { ActivityYear } from 'src/core/domains/ActivityYear/ActivityYear';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('activityYears')
export class ActivityYearController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYYEAR_SERVICE)
        private activityYearService: IActivityYearService,
    ) {}

    @Get('paymentStatistic')
    async paymentStatistic(@Query() query: any) {
        return await this.activityYearService.paymentStatisticByYear(query);
    }

    @Get('paymentStatisticGlobal')
    async paymentStatisticGlobal(@Query() query: any) {
        return await this.activityYearService.statisticGlobal(query);
    }

    @Put(':id')
    async updateActivityYear(
        @Param('id') id: number,
        @Body() activityYear: any,
    ) {
        return {
            activityYear: await this.activityYearService.update(
                id,
                activityYear,
            ),
        };
    }

    @Post()
    async insertActivityYear(@Body() activityYear: ActivityYear) {
        return {
            activityYear: await this.activityYearService.save(activityYear),
        };
    }

    @Delete(':id')
    async deleteActivityYear(@Param('id') id: number) {
        return {
            activityYear: await this.activityYearService.delete(id),
        };
    }

    @Get(':id')
    async getActivityYear(@Param('id') id: number) {
        return {
            activityYear: await this.activityYearService.fetchById(id),
        };
    }

    @Get()
    getAllActivityYears(@Query() query: any) {
        return this.activityYearService.fetchAllWithCriteria(query, null, [
            { order: 'end_year', option: 'DESC' },
        ]);
    }
}
