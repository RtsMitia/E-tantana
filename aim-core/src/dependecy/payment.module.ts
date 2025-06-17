import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from 'src/core/applicationServices/Payment/PaymentService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { Payment } from 'src/core/domains/Payment/Payment';
import { PaymentRepository } from 'src/infrastructure/repositories/Payment/PaymentRepository';
import { PaymentController } from 'src/ui/Portal/Payment/PaymentController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { ActivityFieldModule } from './activity-field.module';
import { ActivityYearModule } from './activity-year.module';
import { PaymentDetailModule } from './payment-detail.module';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PAYMENT_SERVICE,
            useClass: PaymentService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PAYMENT_REPOSITORY,
            useClass: PaymentRepository,
        },
    ],
    controllers: [PaymentController],
    imports: [
        TypeOrmModule.forFeature([Payment]),
        ActivityFieldModule,
        ActivityYearModule,
        PaymentDetailModule,
    ],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.PAYMENT_SERVICE,
            useClass: PaymentService,
        },
    ],
})
export class PaymentModule {}
