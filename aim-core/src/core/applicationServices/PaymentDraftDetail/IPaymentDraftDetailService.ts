import { PaymentDraftDetail } from 'src/core/domains/PaymentDraftDetail/PaymentDraftDetail';
import { IGeneralDtoService } from '../GeneralDto/IGeneralDtoService';

export interface IPaymentDraftDetailService extends IGeneralDtoService {
    fetchAllPaymentsDraftDetailsForOnePayment(id: number, criteria);
    assignmentMembersOfPayments(paymentDraftDetail: PaymentDraftDetail);
    transmitDataToPaymentDraftDetails(file: Express.Multer.File, year);
    transmitDataToPaymentDraftDetails1(file: Express.Multer.File, year);
}
