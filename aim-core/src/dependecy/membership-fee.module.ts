import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipFeeService } from 'src/core/applicationServices/MembershipFee/MembershipFeeService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { MembershipFee } from 'src/core/domains/MembershipFee/MembershipFee';
import { MembershipFeeRepository } from 'src/infrastructure/repositories/MembershipFee/MembershipFeeRepository';
import { MembershipFeeController } from 'src/ui/Portal/MembershipFee/MembershipFeeController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.MEMBERSHIPFEE_SERVICE,
            useClass: MembershipFeeService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.MEMBERSHIPFEE_REPOSITORY,
            useClass: MembershipFeeRepository,
        },
    ],
    controllers: [MembershipFeeController],
    imports: [TypeOrmModule.forFeature([MembershipFee])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.MEMBERSHIPFEE_SERVICE,
            useClass: MembershipFeeService,
        },
    ],
})
export class MembershipFeeModule {}
