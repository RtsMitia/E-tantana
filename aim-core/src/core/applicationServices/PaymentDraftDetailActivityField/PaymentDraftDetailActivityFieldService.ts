import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IPaymentDraftDetailActivityFieldRepository } from 'src/core/domainServices/PaymentDraftDetailActivityField/IPaymentDraftDetailActivityFieldRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IPaymentDraftDetailActivityFieldService } from './IPaymentDraftDetailActivityFieldService';

@Injectable()
export class PaymentDraftDetailActivityFieldService
    extends GeneralDtoService
    implements IPaymentDraftDetailActivityFieldService
{
    constructor(
        @Inject(
            REPOSITORY_MAPPING_TOKEN.PAYMENTDRAFTDETAILACTIVITYFIELD_REPOSITORY,
        )
        private readonly paymentDraftDetailActivityFieldRepository: IPaymentDraftDetailActivityFieldRepository,
    ) {
        super(paymentDraftDetailActivityFieldRepository);
    }
}
