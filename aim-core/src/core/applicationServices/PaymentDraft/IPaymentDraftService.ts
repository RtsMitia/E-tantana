import { ActivityField } from 'src/core/domains/ActivityField/ActivityField';
import { PaymentDraft } from 'src/core/domains/PaymentDraft/PaymentDraft';
import { PaymentDraftDetail } from 'src/core/domains/PaymentDraftDetail/PaymentDraftDetail';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IPaymentDraftService extends IGeneralDtoService {
    fetchAllPaymentDraftWithCriteria(criteria): Promise<unknown>;
    saveGroupPayment(
        PaymentDraftDetails: PaymentDraftDetail[],
        paymentDraftData: PaymentDraft,
        activityFields: ActivityField[][],
    );
    fetchPaymentsInvalide(criteria);
    validatePayment(
        paymentDraft: PaymentDraft,
        paymentDraftDetails: PaymentDraftDetail[],
        data: any,
    );
    fetchAllPaymentDraftDetails(id: number, criteria);
    saveIndividualPaymentDraft(
        paymentDraftData: PaymentDraft,
        paymentDraftDetailData: PaymentDraftDetail,
        activityFields: [],
    );
}
