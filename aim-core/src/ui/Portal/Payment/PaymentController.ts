import {
    Controller,
    Get,
    Inject,
    Param,
    Query,
    Post,
    Body,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { IPaymentService } from 'src/core/applicationServices/Payment/IPaymentService';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('payments')
export class PaymentController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PAYMENT_SERVICE)
        private paymentService: IPaymentService,
    ) {}

    @Get()
    async findAll(@Query() query: any) {
        return {
            payment: await this.paymentService.fetchAllPaymentWithCriteria(
                query,
            ),
        };
    }

    @Get('check')
    async checkPayment(@Query() query: any) {
        return {
            payment: await this.paymentService.checkPayment(query.id),
        };
    }

    @Get('public')
    async fetchPublicPaymentsListByAfAndAy(@Query() query: any) {
        return {
            payment: await this.paymentService.fetchPublicPaymentsListByAfAndAy(
                query.activityField,
                query.activityYear,
            ),
        };
    }

    @Get('publicByName')
    async fetchPublicPaymentsListByNameAndAy(@Query() query: any) {
        return {
            payment:
                await this.paymentService.findPublicPaymentsListByNameAndAy(
                    query.name,
                    query.activityYear,
                ),
        };
    }

    @HttpCode(HttpStatus.OK)
    @Post('paymentTickets')
    async generatePaymentTickets(@Body() body: any) {
        return {
            payments: await this.paymentService.generatePaymentTickets(
                body.payments,
            ),
        };
    }

    @Get('paymentDetails/:id')
    getAllPaymentDetails(@Param('id') id: number) {
        return this.paymentService.fetchAllPaymentDetails(id);
    }

    @Post()
    createPayment(@Body() body: any) {
        return this.paymentService.save(body);
    }
}
