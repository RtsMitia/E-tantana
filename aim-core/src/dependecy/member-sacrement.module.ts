import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberSacrementService } from 'src/core/applicationServices/MemberSacrement/MemberSacrementService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { MemberSacrement } from 'src/core/domains/MemberSacrement/MemberSacrement';
import { MemberSacrementRepository } from 'src/infrastructure/repositories/MemberSacrement/MemberSacrementRepository';
import { MemberSacrementController } from 'src/ui/Portal/MemberSacrement/MemberSacrementController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { MemberModule } from './member.module';
import { SacrementModule } from './sacrement.module';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.MEMBERSACREMENT_SERVICE,
            useClass: MemberSacrementService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.MEMBERSACREMENT_REPOSITORY,
            useClass: MemberSacrementRepository,
        },
    ],
    controllers: [MemberSacrementController],
    imports: [
        TypeOrmModule.forFeature([MemberSacrement]),
        MemberModule,
        SacrementModule,
    ],
})
export class MemberSacrementModule {}
