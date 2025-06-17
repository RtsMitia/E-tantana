import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IPaymentTypeRepository } from 'src/core/domainServices/PaymentType/IPaymentTypeRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IPaymentTypeService } from './IPaymentTypeService';

@Injectable()
export class PaymentTypeService
    extends GeneralDtoService
    implements IPaymentTypeService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PAYMENTTYPE_REPOSITORY)
        paymentTypeRepository: IPaymentTypeRepository,
    ) {
        super(paymentTypeRepository);
    }
}
