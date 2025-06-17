import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentDraftDetailActivityField } from 'src/core/domains/PaymentDraftDetailActivityField/PaymentDraftDetailActivityField';
import { IPaymentDraftDetailActivityFieldRepository } from 'src/core/domainServices/PaymentDraftDetailActivityField/IPaymentDraftDetailActivityFieldRepository';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class PaymentDraftDetailActivityFieldRepository
    extends GeneralDtoRepository
    implements IPaymentDraftDetailActivityFieldRepository
{
    constructor(
        @InjectRepository(PaymentDraftDetailActivityField)
        paymentDraftDetailActivityFieldRepository: Repository<PaymentDraftDetailActivityField>,
    ) {
        super(paymentDraftDetailActivityFieldRepository);
    }
}
