import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDetailService } from 'src/core/applicationServices/PaymentDetail/PaymentDetailService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { PaymentDetail } from 'src/core/domains/PaymentDetail/PaymentDetail';
import { PaymentDetailRepository } from 'src/infrastructure/repositories/PaymentDetail/PaymentDetailRepository';
import { PaymentDetailController } from 'src/ui/Portal/PaymentDetail/PaymentDetailController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { ActivityFieldModule } from './activity-field.module';
import { ActivityYearModule } from './activity-year.module';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PAYMENTDETAIL_SERVICE,
            useClass: PaymentDetailService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PAYMENTDETAIL_REPOSITORY,
            useClass: PaymentDetailRepository,
        },
    ],
    controllers: [PaymentDetailController],
    imports: [
        TypeOrmModule.forFeature([PaymentDetail]),
        ActivityFieldModule,
        ActivityYearModule,
    ],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.PAYMENTDETAIL_SERVICE,
            useClass: PaymentDetailService,
        },
    ],
})
export class PaymentDetailModule {}
