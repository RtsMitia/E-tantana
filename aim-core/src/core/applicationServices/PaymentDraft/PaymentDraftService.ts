import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';
import { PaymentDraft } from 'src/core/domains/PaymentDraft/PaymentDraft';
import { PaymentDraftDetail } from 'src/core/domains/PaymentDraftDetail/PaymentDraftDetail';
import { IPaymentDraftRepository } from 'src/core/domainServices/PaymentDraft/IPaymentDraftRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IPaymentDraftService } from './IPaymentDraftService';

@Injectable()
export class PaymentDraftService
    extends GeneralDtoService
    implements IPaymentDraftService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PAYMENTDRAFT_REPOSITORY)
        private readonly paymentDraftRepository: IPaymentDraftRepository,
    ) {
        super(paymentDraftRepository);
    }

    fetchAllPaymentDraftWithCriteria(criteria): Promise<unknown> {
        return this.paymentDraftRepository.findAllPaymentDraftWithCriteria(
            criteria,
        );
    }

    saveGroupPayment(
        paymentDraftDetails: PaymentDraftDetail[],
        paymentDraftData: PaymentDraft,
        activityFields: ActivityField[][],
    ) {
        return this.paymentDraftRepository.saveGroupPayment(
            paymentDraftDetails,
            paymentDraftData,
            activityFields,
        );
    }

    fetchPaymentsInvalide(criteria) {
        return this.paymentDraftRepository.getPaymentsInvalide(criteria);
    }

    validatePayment(
        paymentDraft: PaymentDraft,
        paymentDraftDetails: PaymentDraftDetail[],
        data: any,
    ) {
        return this.paymentDraftRepository.validatePayment(
            paymentDraft,
            paymentDraftDetails,
            data,
        );
    }

    fetchAllPaymentDraftDetails(id: number, criteria) {
        return this.paymentDraftRepository.getAllPaymentDraftDetails(
            id,
            criteria,
        );
    }

    saveIndividualPaymentDraft(
        paymentDraftData: PaymentDraft,
        paymentDraftDetailData: PaymentDraftDetail,
        activityFields: [],
    ) {
        return this.paymentDraftRepository.saveIndividualPaymentDraft(
            paymentDraftData,
            paymentDraftDetailData,
            activityFields,
        );
    }
}
