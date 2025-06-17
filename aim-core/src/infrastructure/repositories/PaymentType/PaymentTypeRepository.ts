import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentType } from 'src/core/domains/PaymentType/PaymentType';
import { Repository } from 'typeorm';
import { GeneralDtoRepository } from '../GeneralDto/GeneralDtoRepository';

@Injectable()
export class PaymentTypeRepository extends GeneralDtoRepository {
    constructor(
        @InjectRepository(PaymentType)
        paymentTypeRepository: Repository<PaymentType>,
    ) {
        super(paymentTypeRepository);
    }
}
