import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IPaymentRepository } from 'src/core/domainServices/Payment/IPaymentRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IPaymentService } from './IPaymentService';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { IActivityFieldService } from '../ActivityField/IActivityFieldService';
import * as qrcode from 'qrcode';
import * as sharp from 'sharp';

@Injectable()
export class PaymentService
    extends GeneralDtoService
    implements IPaymentService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.PAYMENT_REPOSITORY)
        private readonly paymentRepository: IPaymentRepository,
        @Inject(SERVICE_MAPPING_TOKEN.ACTIVITYFIELD_SERVICE)
        private readonly activityFieldService: IActivityFieldService,
    ) {
        super(paymentRepository);
    }

    fetchAllPaymentWithCriteria(criteria): Promise<unknown> {
        return this.paymentRepository.findAllPaymentWithCriteria(criteria);
    }

    fetchAllPaymentDetails(id: number) {
        return this.paymentRepository.getAllPaymentDetails(id);
    }

    fetchPublicPaymentsListByAfAndAy(
        activityField,
        activityYear,
    ): Promise<unknown> {
        return this.paymentRepository.findPublicPaymentsListByAfAndAy(
            activityField,
            activityYear,
        );
    }

    checkPayment(id): Promise<unknown> {
        return this.paymentRepository.checkPayment(id);
    }

    findPublicPaymentsListByNameAndAy(name, activityYear): Promise<unknown> {
        return this.paymentRepository.findPublicPaymentsListByNameAndAy(
            name,
            activityYear,
        );
    }

    generatePaymentTickets(payments: any[]): Promise<unknown> {
        return this.paymentRepository
            .generatePaymentTickets(payments)
            .then((data: any) => {
                const tmp = data.map((d) => {
                    return new Promise((res) => {
                        this.activityFieldService
                            .getSuperiors(d.activity_field_id)
                            .then((f) => {
                                // add superior fields
                                d.fields = f;
                                return d;
                            })
                            .then(() => {
                                // add qr code
                                qrcode
                                    .toBuffer(`${d.paymentDetailId}`)
                                    .then((qrCodeBuffer) => {
                                        sharp(qrCodeBuffer)
                                            .resize(300)
                                            .toBuffer()
                                            .then((buffer) => {
                                                d.qr =
                                                    buffer.toString('base64');
                                                res(d);
                                            });
                                    });
                            });
                    });
                });
                return Promise.all(tmp).then((res) => res);
            });
    }
}
