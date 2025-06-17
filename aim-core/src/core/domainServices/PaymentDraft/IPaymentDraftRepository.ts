import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';
import { PaymentDraft } from 'src/core/domains/PaymentDraft/PaymentDraft';
import { PaymentDraftDetail } from 'src/core/domains/PaymentDraftDetail/PaymentDraftDetail';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IPaymentDraftRepository extends IGeneralDtoRepository {
    findAllPaymentDraftWithCriteria(criteria): Promise<unknown>;
    saveGroupPayment(
        PaymentDraftDetails: PaymentDraftDetail[],
        paymentDraftData: PaymentDraft,
        activityFields: ActivityField[][],
    );
    getPaymentsInvalide(criteria);
    checkValidatePayment(id: number);
    validatePayment(
        paymentDraft: PaymentDraft,
        paymentDraftDetails: PaymentDraftDetail[],
        data: any,
    );
    getAllPaymentDraftDetails(id: number, criteria);
    saveIndividualPaymentDraft(
        paymentDraftData: PaymentDraft,
        paymentDraftDetailData: PaymentDraftDetail,
        activityFields: [],
    );
}
