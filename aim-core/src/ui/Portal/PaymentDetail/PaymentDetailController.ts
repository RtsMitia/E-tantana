import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { IPaymentDetailService } from 'src/core/applicationServices/PaymentDetail/IPaymentDetailService';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('paymentDetails')
export class PaymentDetailController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PAYMENTDETAIL_SERVICE)
        private paymentDetailService: IPaymentDetailService,
    ) {}

    @Get('member/:id')
    async getMemberPayment(@Query() query: any, @Param('id') id: number) {
        return await this.paymentDetailService.fetchMemberPayment(id, query);
    }

    @Get('statisticByCategory')
    async statisticByCategory(@Query() query: any) {
        return await this.paymentDetailService.statisticByCategory(query);
    }

    @Get('globalStatistic')
    async globalStatistic(@Query() query: any) {
        return await this.paymentDetailService.globalStatistic(query);
    }

    @Get(':id')
    async findPaymentDetailByPaymentId(@Param('id') id: number) {
        return {
            paymentType:
                await this.paymentDetailService.fetchPaymentDetailsByPaymentId(
                    id,
                ),
        };
    }

    @Get()
    findAllWithCriteria(@Query() query: any) {
        return this.paymentDetailService.fetchAllWithCriteria(query);
    }
}
