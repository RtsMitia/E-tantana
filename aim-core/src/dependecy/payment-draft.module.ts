import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDraftService } from 'src/core/applicationServices/PaymentDraft/PaymentDraftService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { PaymentDraft } from 'src/core/domains/PaymentDraft/PaymentDraft';
import { PaymentDraftRepository } from 'src/infrastructure/repositories/PaymentDraft/PaymentDraftRepository';
import { PaymentDraftController } from 'src/ui/Portal/PaymentDraft/PaymentDraftController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { MemberModule } from './member.module';
import { PaymentDetailModule } from './payment-detail.module';
import { PaymentDraftDetailActivityFieldModule } from './payment-draft-detail-activity-field.module';
import { PaymentDraftDetailModule } from './payment-draft-detail.module';
import { PaymentModule } from './payment.module';
import { MemberActivityModule } from './member-activity.module';
import { ActivityFieldModule } from './activity-field.module';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PAYMENTDRAFT_SERVICE,
            useClass: PaymentDraftService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PAYMENTDRAFT_REPOSITORY,
            useClass: PaymentDraftRepository,
        },
    ],
    controllers: [PaymentDraftController],
    imports: [
        TypeOrmModule.forFeature([PaymentDraft]),
        PaymentDraftDetailModule,
        MemberModule,
        MemberActivityModule,
        PaymentModule,
        PaymentDetailModule,
        PaymentDraftDetailActivityFieldModule,
        ActivityFieldModule
    ],
})
export class PaymentDraftModule {}
