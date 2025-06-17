import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { IPaymentDraftService } from 'src/core/applicationServices/PaymentDraft/IPaymentDraftService';
import { PaymentDraft } from 'src/core/domains/PaymentDraft/PaymentDraft';
import { PaymentDraftDetail } from 'src/core/domains/PaymentDraftDetail/PaymentDraftDetail';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Controller('paymentDrafts')
export class PaymentDraftController {
    constructor(
        @Inject(SERVICE_MAPPING_TOKEN.PAYMENTDRAFT_SERVICE)
        private paymentDraftService: IPaymentDraftService,
    ) {}

    @Get()
    async fetchAll(@Query() query: any) {
        return {
            paymentDraft:
                await this.paymentDraftService.fetchAllPaymentDraftWithCriteria(
                    query,
                ),
        };
    }

    @Post('validatePayment')
    async validatePayment(
        @Body('note') data: any,
        @Body('paymentDraftDetails') paymentDraftDetails: PaymentDraftDetail[],
        @Body('paymentDraft') paymentDraft: PaymentDraft,
    ) {
        return await this.paymentDraftService.validatePayment(
            paymentDraft,
            paymentDraftDetails,
            data,
        );
    }

    @Get('paymentDraftDetails/:id')
    getAllpaymentDraftDetaiks(@Param('id') id: number, @Query() query: any) {
        return this.paymentDraftService.fetchAllPaymentDraftDetails(id, query);
    }

    @Get('paymentNotValited')
    getPaymentsNotValidated(@Query() query: any) {
        return this.paymentDraftService.fetchPaymentsInvalide(query);
    }

    @Post('individualPayment')
    individualPaymentDraft(
        @Body() paymentDraft: PaymentDraft,
        @Body() paymentDraftDetail: PaymentDraftDetail,
        @Body('activityFields') activityField: [],
    ) {
        return this.paymentDraftService.saveIndividualPaymentDraft(
            paymentDraft,
            paymentDraftDetail,
            activityField,
        );
    }

    @Post('groupPayment')
    groupPaymentDraft(
        @Body() paymentDraft: PaymentDraft,
        @Body('payment_draft_details') paymentDraftDetail: PaymentDraftDetail[],
        @Body('activityFields') activityField: [],
    ) {
        return this.paymentDraftService.saveGroupPayment(
            paymentDraftDetail,
            paymentDraft,
            activityField,
        );
    }
}
