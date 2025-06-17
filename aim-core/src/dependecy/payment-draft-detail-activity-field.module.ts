import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDraftDetailActivityFieldService } from 'src/core/applicationServices/PaymentDraftDetailActivityField/PaymentDraftDetailActivityFieldService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { PaymentDraftDetailActivityField } from 'src/core/domains/PaymentDraftDetailActivityField/PaymentDraftDetailActivityField';
import { PaymentDraftDetailActivityFieldRepository } from 'src/infrastructure/repositories/PaymentDraftDetailActivityField/PaymentDraftDetailActivityFieldRepository';
import { PaymentDraftDetailActivityFieldController } from 'src/ui/Portal/PaymentDraftDetailActivityField/PaymentDraftDetailActivityFieldController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide:
                SERVICE_MAPPING_TOKEN.PAYMENTDRAFTDETAILACTIVITYFIELD_SERVICE,
            useClass: PaymentDraftDetailActivityFieldService,
        },
        {
            provide:
                REPOSITORY_MAPPING_TOKEN.PAYMENTDRAFTDETAILACTIVITYFIELD_REPOSITORY,
            useClass: PaymentDraftDetailActivityFieldRepository,
        },
    ],
    controllers: [PaymentDraftDetailActivityFieldController],
    imports: [TypeOrmModule.forFeature([PaymentDraftDetailActivityField])],
    exports: [
        {
            provide:
                SERVICE_MAPPING_TOKEN.PAYMENTDRAFTDETAILACTIVITYFIELD_SERVICE,
            useClass: PaymentDraftDetailActivityFieldService,
        },
    ],
})
export class PaymentDraftDetailActivityFieldModule {}
