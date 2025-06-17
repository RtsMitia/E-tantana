import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IPaymentDetailRepository } from 'src/core/domainServices/PaymentDetail/IPaymentDetailRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IPaymentDetailService } from './IPaymentDetailService';

@Injectable()
export class PaymentDetailService
    extends GeneralDtoService
    implements IPaymentDetailService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PAYMENTDETAIL_REPOSITORY)
        private readonly paymentDetailRepository: IPaymentDetailRepository,
    ) {
        super(paymentDetailRepository);
    }

    fetchMemberPayment(id: number, criteria) {
        return this.paymentDetailRepository.getMemberPayment(id, criteria);
    }

    statisticByCategory(criteria: any) {
        return this.paymentDetailRepository.statisticByCategory(criteria);
    }

    globalStatistic(criteria: any) {
        return this.paymentDetailRepository.globalStatistic(criteria);
    }

    fetchPaymentDetailsByPaymentId(id: number): Promise<unknown> {
        return this.paymentDetailRepository.findPaymentDetailsByPaymentId(id);
    }
}
