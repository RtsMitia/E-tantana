import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { PaymentDraftDetail } from 'src/core/domains/PaymentDraftDetail/PaymentDraftDetail';
import { IPaymentDraftDetailRepository } from 'src/core/domainServices/PaymentDraftDetail/IPaymentDraftDetailRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IPaymentDraftDetailService } from './IPaymentDraftDetailService';

@Injectable()
export class PaymentDraftDetailService
    extends GeneralDtoService
    implements IPaymentDraftDetailService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PAYMENTDRAFTDETAIL_REPOSITORY)
        private readonly paymentDraftDetailRepository: IPaymentDraftDetailRepository,
    ) {
        super(paymentDraftDetailRepository);
    }

    fetchAllPaymentsDraftDetailsForOnePayment(id: number, criteria) {
        return this.paymentDraftDetailRepository.getAllPaymentsDraftDetailsForOnePayment(
            id,
            criteria,
        );
    }

    assignmentMembersOfPayments(paymentDraftDetail: PaymentDraftDetail) {
        return this.paymentDraftDetailRepository.assignmentMembersOfPayments(
            paymentDraftDetail,
        );
    }

    transmitDataToPaymentDraftDetails(file: Express.Multer.File, year) {
        return this.paymentDraftDetailRepository.transmitDataToPaymentDraftDetails(
            file,
            year,
        );
    }

    transmitDataToPaymentDraftDetails1(file: Express.Multer.File, year) {
        return this.paymentDraftDetailRepository.transmitDataToPaymentDraftDetails1(
            file,
            year,
        );
    }

}
