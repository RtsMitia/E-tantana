import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDraftDetailService } from 'src/core/applicationServices/PaymentDraftDetail/PaymentDraftDetailService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { PaymentDraftDetail } from 'src/core/domains/PaymentDraftDetail/PaymentDraftDetail';
import { PaymentDraftDetailRepository } from 'src/infrastructure/repositories/PaymentDraftDetail/PaymentDraftDetailRepository';
import { PaymentDraftDetailController } from 'src/ui/Portal/PaymentDraftDetail/PaymentDraftDetailController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { ActivityFieldModule } from './activity-field.module';
import { ActivityYearModule } from './activity-year.module';
import { ExcelModule } from './excel.module';
import { FeeTypeModule } from './fee-type.module';
import { HierarchyModule } from './hierarchy.module';
import { MemberRoleModule } from './member-role.module';
import { MembershipFeeModule } from './membership-fee.module';
import { SectionModule } from './section.module';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PAYMENTDRAFTDETAIL_SERVICE,
            useClass: PaymentDraftDetailService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PAYMENTDRAFTDETAIL_REPOSITORY,
            useClass: PaymentDraftDetailRepository,
        },
    ],
    controllers: [PaymentDraftDetailController],
    imports: [
        TypeOrmModule.forFeature([PaymentDraftDetail]),
        ExcelModule,
        MemberRoleModule,
        FeeTypeModule,
        HierarchyModule,
        MembershipFeeModule,
        ActivityFieldModule,
        ActivityYearModule,
        SectionModule,
    ],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.PAYMENTDRAFTDETAIL_SERVICE,
            useClass: PaymentDraftDetailService,
        },
    ],
})
export class PaymentDraftDetailModule {}
