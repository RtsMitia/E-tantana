import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberActivityService } from 'src/core/applicationServices/MemberActivity/MemberActivityService';
import { MemberTransferRequestService } from 'src/core/applicationServices/MemberTransferRequest/MemberTransferRequestService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { MemberTransferRequest } from 'src/core/domains/MemberTransferRequest/MemberTransferRequest';
import { MemberTransferRequestRepository } from 'src/infrastructure/repositories/MemberTransferRequest/MemberTransferRequestRepository';
import { MemberTransferRequestController } from 'src/ui/Portal/MemberTransferRequest/MemberTransferRequestController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { MemberActivityModule } from './member-activity.module';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.MEMBERTRANSFERREQUEST_SERVICE,
            useClass: MemberTransferRequestService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.MEMBERTRANSFERREQUEST_REPOSITORY,
            useClass: MemberTransferRequestRepository,
        },
    ],
    controllers: [MemberTransferRequestController],
    imports: [
        TypeOrmModule.forFeature([MemberTransferRequest]),
        MemberActivityModule,
    ],
})
export class MemberTransferRequestModule {}
