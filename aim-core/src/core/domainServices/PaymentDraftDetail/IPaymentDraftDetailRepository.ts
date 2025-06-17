import { PaymentDraftDetail } from 'src/core/domains/PaymentDraftDetail/PaymentDraftDetail';
import { IGeneralDtoRepository } from '../GeneralDto/IGeneralDtoRepository';

export interface IPaymentDraftDetailRepository extends IGeneralDtoRepository {
    getAllPaymentsDraftDetailsForOnePayment(id: number, criteria);
    assignmentMembersOfPayments(paymentDraftDetail: PaymentDraftDetail);
    transmitDataToPaymentDraftDetails(file: Express.Multer.File, year);
    transmitDataToPaymentDraftDetails1(file: Express.Multer.File, year);
}
