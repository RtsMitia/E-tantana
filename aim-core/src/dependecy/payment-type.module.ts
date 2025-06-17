import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTypeService } from 'src/core/applicationServices/PaymentType/PaymentTypeService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { PaymentType } from 'src/core/domains/PaymentType/PaymentType';
import { PaymentTypeRepository } from 'src/infrastructure/repositories/PaymentType/PaymentTypeRepository';
import { PaymentTypeController } from 'src/ui/Portal/PaymentType/PaymentTypeController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PAYMENTTYPE_SERVICE,
            useClass: PaymentTypeService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PAYMENTTYPE_REPOSITORY,
            useClass: PaymentTypeRepository,
        },
        PaymentTypeService,
    ],
    controllers: [PaymentTypeController],
    imports: [TypeOrmModule.forFeature([PaymentType])],
})
export class PaymentTypeModule {}
