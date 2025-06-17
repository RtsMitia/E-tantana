import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IPaymentDraftDetailActivityFieldService } from 'src/core/applicationServices/PaymentDraftDetailActivityField/IPaymentDraftDetailActivityFieldService';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('paymentDraftDetailActivityFields')
export class PaymentDraftDetailActivityFieldController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PAYMENTDRAFTDETAILACTIVITYFIELD_SERVICE)
        private paymentDraftDetailActivityFieldService: IPaymentDraftDetailActivityFieldService,
    ) {}

    @Get()
    async findPaymentDraftDetailActivityFieldByPaymentDraftId(@Query() query) {
        return await this.paymentDraftDetailActivityFieldService.fetchAllWithCriteria(
            query,
            [
                {
                    property: 'PaymentDraftDetailActivityField.activityField',
                    alias: 'activityField',
                },
                {
                    property: 'activityField.hierarchy',
                    alias: 'hierarchy',
                },
            ],
        );
    }
}
