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
import { IFeeTypeService } from 'src/core/applicationServices/FeeType/IFeeTypeService';
import { FeeType } from 'src/core/domains/FeeType/FeeType';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('feeTypes')
export class FeeTypeController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.FEETYPE_SERVICE)
        private feeTypeService: IFeeTypeService,
    ) {}

    @Get('feeTypeForActivityField')
    async getFeeTypeForActivityField(@Query('activityFields') query) {
        const activityFields = [];
        if (query) {
            if (typeof query == typeof []) {
                query.forEach((query) => {
                    activityFields.push(query);
                });
            } else {
                activityFields.push(query);
            }
        }
        return this.feeTypeService.fetchFeeTypeForActivityField(activityFields);
    }

    @Put(':id')
    async updateFeeType(@Param('id') id: number, @Body() feeType: any) {
        return {
            feeType: await this.feeTypeService.update(id, feeType),
        };
    }

    @Post()
    async insertFeeType(@Body() feeType: FeeType) {
        return {
            feeType: await this.feeTypeService.save(feeType),
        };
    }

    @Delete(':id')
    async deleteFeeType(@Param('id') id: number) {
        return {
            feeType: await this.feeTypeService.delete(id),
        };
    }

    @Get(':id')
    async getFeeType(@Param('id') id: number) {
        return {
            feeType: await this.feeTypeService.fetchFeeTypeById(id),
        };
    }

    @Get()
    getAllfeeTypes() {
        return this.feeTypeService.fetchAllFeeTypesWithCriteria();
    }
}
